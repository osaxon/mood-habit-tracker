"use server";
import {
    type UserDashboardData,
    type AddToDatabaseResponse,
} from "@/types/prisma";
import { UTApi } from "uploadthing/server";
import { prisma, xprisma } from "../libs/prisma";
import {
    type AddHabitInstanceInputs,
    type AddHabitRecordInputs,
    type UpdateUserRecordInputs,
    updateUserRecord,
    addHabitRecordSchema,
    CreateInviteInputs,
    createInviteFormSchema,
} from "../libs/formSchemas";
import { revalidatePath } from "next/cache";
import {
    TargetFrequency,
    type HabitInstance,
    type UserHabitRecord,
    type Invitations,
    User,
} from "@prisma/client";
import { Resend } from "resend";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import WelcomeEmail from "@/components/email-templates/welcome";
dayjs.extend(advancedFormat);

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function getChartData(
    habitId: string,
    habitFreq: TargetFrequency
) {
    const range = 6;
    const unit = habitFreq === "Weekly" ? "week" : "day";
    const dateFormat = habitFreq === "Weekly" ? "DD-MM-YYYY" : "DD-MM";
    const today = dayjs().endOf(unit);
    const startDate = dayjs().startOf(unit).subtract(range, unit);

    // get habit record data and group by the created date
    const data = await prisma.userHabitRecord.groupBy({
        by: ["createdDate"],
        _sum: {
            value: true,
        },
        where: {
            habitInstanceId: habitId,
            createdDate: {
                gte: startDate.toDate(),
                lt: today.toDate(),
            },
        },
    });

    let dataSums: { [key: string]: number } = {};

    if (habitFreq === "Weekly") {
        data.forEach((item) => {
            const weekCommencingDate = dayjs(item.createdDate)
                .startOf("week")
                .format("DD-MM-YYYY");
            if (!dataSums[weekCommencingDate]) {
                dataSums[weekCommencingDate] = 0;
            }
            dataSums[weekCommencingDate] += item._sum.value!;
        });
    } else {
        data.forEach((item) => {
            const date = dayjs(item.createdDate).format(dateFormat);
            dataSums[date] = item._sum.value || 0;
        });
    }

    const chartData = [];

    for (let i = 0; i <= range; i++) {
        const date = startDate.add(i, unit);
        const formattedDate = date.format(dateFormat);

        chartData.push({
            date: formattedDate,
            value: dataSums[formattedDate] || 0,
        });
    }

    revalidatePath("/dashboard");
    return chartData;
}

const utapi = new UTApi();

/**
 * @see https://docs.uploadthing.com/api-reference/server#uploadfiles
 */
export async function uploadFiles(fd: FormData) {
    const files = fd.getAll("files") as File[];
    const uploadedFiles = await utapi.uploadFiles(files);
    return uploadedFiles;
}

/**
 * @see https://docs.uploadthing.com/api-reference/server#uploadfilesfromurl
 */
export async function uploadFromUrl(fd: FormData) {
    const url = fd.get("url") as string;
    const uploadedFile = await utapi.uploadFilesFromUrl(url);
    return uploadedFile.data;
}

export async function getUserDashboardData({
    userId,
}: {
    userId: string;
}): Promise<UserDashboardData> {
    let data: UserDashboardData | null;

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
        data = await prisma.habitInstance.create({
            data: {
                ...inputs,
                expiresAt: currentDate.toDate(),
            },
        });
        // revalidatePath("/dashboard/habits");
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
        data = await xprisma.userHabitRecord.create({
            data: {
                ...inputs,
                value: Number(inputs.value),
            },
        });
        revalidatePath("/dashboard", "page");
    } catch (error) {
        throw new Error(getMessageFromError(error));
    }

    return {
        success: true,
        data,
        error: undefined,
    };
}

export async function updateUser(
    inputs: UpdateUserRecordInputs
): Promise<AddToDatabaseResponse<User>> {
    const validatedInput = updateUserRecord.safeParse(inputs);
    const { success } = validatedInput;

    if (!success) {
        throw new Error(getMessageFromError(validatedInput.error));
    }

    let data: User;

    try {
        data = await prisma.user.update({
            where: {
                id: inputs.id,
            },
            data: {
                ...inputs.data,
            },
        });
    } catch (error) {
        throw new Error(getMessageFromError(error));
    }

    return {
        success: true,
        data,
        error: undefined,
    };
}

export async function getUserData({ id }: { id: string }) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
}

export async function updateProfileImage({
    userId,
    imgUrl,
}: {
    userId: string;
    imgUrl: string;
}) {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            image: imgUrl,
        },
    });

    revalidatePath("/profile");

    return updatedUser;
}

export async function getInvitations(): Promise<Invitations[] | undefined> {
    let invitations;
    try {
        invitations = await prisma.invitations.findMany({});
        return invitations;
    } catch (error) {
        // throw
    }

    return invitations;
}

export async function createInvite(inputs: CreateInviteInputs) {
    const validatedInput = createInviteFormSchema.safeParse(inputs);
    const { success } = validatedInput;

    if (!success) {
        throw new Error(getMessageFromError(validatedInput.error));
    }
    let data;
    try {
        // the extended prisma client ensures the createdDate field is set for all new habit records
        data = await prisma.invitations.create({
            data: {
                ...inputs,
                expiry: dayjs(new Date())
                    .startOf("day")
                    .add(1, "month")
                    .toDate(),
                used: false,
            },
        });
        await resend.emails.send({
            from: "Habit Team <olisaxon@webjenga.com>",
            to: [inputs.email],
            subject: "You're invited!",
            react: WelcomeEmail({ userFirstname: inputs.email }),
        });
        revalidatePath("/admin/invitations");
    } catch (error) {
        throw new Error(getMessageFromError(error));
    }

    return {
        success: true,
        data,
        error: undefined,
    };
}

export async function getUsers(): Promise<User[] | undefined> {
    let users;
    try {
        users = await prisma.user.findMany();
        return users;
    } catch (error) {
        // throw
    }
}
