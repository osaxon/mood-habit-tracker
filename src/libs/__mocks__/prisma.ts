import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { ExtendedClient } from "../prisma";

beforeEach(() => {
    mockReset(prisma);
    mockReset(xprisma);
});

export const prisma = mockDeep<PrismaClient>();
export const xprisma = mockDeep<ExtendedClient>();
