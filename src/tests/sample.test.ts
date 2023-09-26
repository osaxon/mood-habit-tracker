import { expect, test, vi, expectTypeOf } from "vitest";
import { addHabitRecord } from "@/app/actions";
import { AddToDatabaseResponse } from "@/types/prisma";
import { UserHabitRecord } from "@prisma/client";
import { prisma } from "@/libs/__mocks__/prisma";

vi.mock("../libs/prisma");

test("create habit", async () => {
    const newHabit = {
        id: "12345",
        value: 10,
        habitInstanceId: "2123",
        userId: "134",
        createdAt: null,
        createdDate: null,
    };

    console.log(prisma.userHabitRecord.create.mockResolvedValue(newHabit));
    const test = await addHabitRecord(newHabit);

    expect(test).toEqual({ success: true, data: test.data, error: undefined });
});
