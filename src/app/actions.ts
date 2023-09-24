"use server";

import { UserWithData, prisma } from "./lib/prisma";

export async function getHabitDefinitions() {
    const data = await prisma.habitDefinition.findMany({
        take: 100,
        include: { users: true },
    });
    return data;
}

export async function getUserDashboardData({ id }: { id: string }) {
    const data = await prisma.user.findUnique({
        where: { id },
        include: { habitDefinitions: true, habitInstances: true },
    });
    return data as UserWithData;
}
