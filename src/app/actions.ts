"use server";

import { z } from "zod";
import { TargetUnit } from "@prisma/client";
import { prisma } from "./lib/prisma";

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

export async function addHabitInstancd(data: AddHabitInstanceInputs) {
    const result = addHabitSchema.safeParse(data);

    return result;
}
