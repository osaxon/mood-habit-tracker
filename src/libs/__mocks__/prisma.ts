import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

beforeEach(() => {
    mockReset(prisma);
});

export const prisma = mockDeep<PrismaClient>();
