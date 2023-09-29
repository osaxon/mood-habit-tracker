import { HabitInstance, Prisma, User } from "@prisma/client";

export type UserDashboardData = Prisma.UserGetPayload<{
    include: {
        habitInstances: { include: { habitDefinition: true } };
        habitRecords: true;
    };
}>;

export type HabitInstanceWithRelations = Prisma.HabitInstanceGetPayload<{
    include: { habitDefinition: true };
}>;

type AddToDatabaseResponse<T> = {
    success: boolean;
    data: T;
    error?: unknown;
};
