"use server";

import { z } from "zod";
import { prisma } from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { addHabitSchema } from "./lib/formSchemas";

type AddHabitInstanceInputs = z.infer<typeof addHabitSchema>;

export async function getHabitDefinitions() {
    const data = await prisma.habitDefinition.findMany({
        take: 100,
    });
    return data;
}

export async function getUserDashboardData({ id }: { id: string }) {
    const data = await prisma.user.findUnique({
        where: { id },
        include: { habitInstances: true },
    });
    return data;
}

export async function getUsersHabits({ userId }: { userId: string }) {
    const data = await prisma.habitInstance.findMany({ where: { userId } });
    return data;
}

export async function addHabitInstance(
    data: AddHabitInstanceInputs
): Promise<{ success: boolean; result: any; error?: any }> {
    const validateInput = addHabitSchema.safeParse(data);
    const { success } = validateInput;

    if (!success) {
        return {
            success: false,
            error: validateInput.error,
            result: undefined,
        };
    }

    // add to db
    let result;
    try {
        result = await prisma.habitInstance.create({
            data: {
                target: data.target,
                targetUnit: data.targetUnit,
                targetFreq: data.targetFreq,
                active: true,
                habitDefinitionId: data.habitId,
                userId: data.userId,
            },
        });

        revalidatePath("/dashboard");
        console.log("successfully created new habit instance");
        console.log(result);
    } catch (err) {
        console.log("error creating new habit instance");
        console.error(err);
        return {
            error: err,
            result: undefined,
            success: false,
        };
    }

    return {
        success: true,
        result,
        error: undefined,
    };
}
