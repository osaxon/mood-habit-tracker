import {
    PrismaClient,
    HabitDefinition,
    HabitInstance,
    User,
    type Prisma,
} from "@prisma/client";
import dayjs from "dayjs";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["error", "warn"]
                : ["error"],
    });

export const xprisma = prisma.$extends({
    query: {
        userHabitRecord: {
            create: async ({ model, operation, args, query }) => {
                const { data } = args;
                const habitRecord = await prisma.userHabitRecord.create({
                    data: {
                        ...data,
                        createdDate: dayjs(new Date()).startOf("day").toDate(),
                    },
                });
            },
        },
    },
});
