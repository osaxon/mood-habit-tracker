import { expect, test, vi } from "vitest";
import { addHabitRecord } from "@/app/actions";

import { prisma } from "@/libs/__mocks__/prisma";

vi.mock("../libs/prisma");

test("Record a new Habit Record against a Habit Instance", async () => {
    const newHabit = {
        id: "12345",
        value: 10,
        habitInstanceId: "2123",
        userId: "134",
        createdAt: null,
        createdDate: null,
    };

    prisma.userHabitRecord.create.mockResolvedValue(newHabit);
    const test = await addHabitRecord(newHabit);

    expect(test).toEqual({ success: true, data: test.data, error: undefined });
});
