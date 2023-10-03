"use server";
import {
    type UserDashboardData,
    type AddToDatabaseResponse,
} from "@/types/prisma";
import { prisma, xprisma } from "../libs/prisma";
import {
    type AddHabitInstanceInputs,
    type AddHabitRecordInputs,
    addHabitInstanceSchema,
    addHabitRecordSchema,
} from "../libs/formSchemas";
import { revalidatePath } from "next/cache";
import { type HabitInstance, type UserHabitRecord } from "@prisma/client";
import dayjs from "dayjs";

const getMessageFromError = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};

export async function getHabitDefinitions() {
    const data = await prisma.habitDefinition.findMany({
        take: 100,
    });
    return data;
}

export async function getSingleHabitDef(habitId: string) {
    const habit = await prisma.habitDefinition.findUnique({
        where: { id: habitId },
    });
    if (!habit) {
        throw new Error("Record not found");
    }
    return habit;
}

export async function getBarChartData(habitId: string) {
    // data to be returned for the last 7 days
    const today = dayjs().endOf("day");
    const oneWeekAgo = dayjs().startOf("day").subtract(6, "day");

    // Generate an array of dates for the last 7 days
    const dateRange = [];
    for (let i = 0; i < 7; i++) {
        dateRange.push(oneWeekAgo.add(i, "day").toDate());
    }

    const data = await prisma.userHabitRecord.groupBy({
        by: ["createdDate"],
        _sum: {
            value: true,
        },
        where: {
            habitInstanceId: habitId, // Filter by the specific habit
            createdDate: {
                gte: oneWeekAgo.toDate(),
                lt: today.toDate(),
            },
        },
    });
    console.log(data);

    // Create a map to store the data by date
    const dataMap = new Map();
    data.forEach((item) => {
        dataMap.set(
            dayjs(item.createdDate).format("YYYY-MM-DD"),
            item._sum.value || 0
        );
    });

    console.log(dataMap);

    // Fill in missing days with zero values
    dateRange.forEach((date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        if (!dataMap.has(formattedDate)) {
            dataMap.set(formattedDate, 0);
        }
    });

    // Convert the map to an array of objects
    const chartData = Array.from(dataMap).map(([date, value]) => ({
        date,
        value,
    }));

    chartData.reverse();

    return chartData;
}

export async function getUserDashboardData({
    userId,
}: {
    userId: string;
}): Promise<UserDashboardData> {
    let data: UserDashboardData | null;
    console.log(userId);

    try {
        data = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                habitInstances: { include: { habitDefinition: true } },
                habitRecords: true,
            },
        });
    } catch (error) {
        throw new Error(getMessageFromError(error));
    }

    if (!data) {
        throw new Error("User not found");
    }

    return data;
}

export async function getUsersHabits({ userId }: { userId: string }) {
    const data = await prisma.habitInstance.findMany({
        where: { userId },
        include: { habitDefinition: true },
    });
    return data;
}

export async function addHabitInstance(
    inputs: AddHabitInstanceInputs
): Promise<AddToDatabaseResponse<HabitInstance>> {
    const currentDate = dayjs();

    let data;

    try {
        console.log("adding habit instance");
        data = await prisma.habitInstance.create({
            data: {
                ...inputs,
                expiresAt: currentDate.toDate(),
            },
        });
        revalidatePath("/dashboard/habits");
        console.log("successfully added");
    } catch (error) {
        throw new Error(getMessageFromError(error));
    }

    return {
        success: true,
        data,
        error: undefined,
    };
}

export async function addHabitRecord(
    inputs: AddHabitRecordInputs
): Promise<AddToDatabaseResponse<UserHabitRecord>> {
    const validatedInput = addHabitRecordSchema.safeParse(inputs);
    const { success } = validatedInput;

    if (!success) {
        throw new Error(getMessageFromError(validatedInput.error));
    }

    let data;
    try {
        // the extended prisma client ensures the createdDate field is set for all new habit records
        data = await prisma.userHabitRecord.create({
            data: {
                ...inputs,
            },
        });
        revalidatePath("/dashboard");
    } catch (error) {
        throw new Error(getMessageFromError(error));
    }

    return {
        success: true,
        data,
        error: undefined,
    };
}
