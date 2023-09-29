import { expect, test, vi } from "vitest";
import { addHabitRecord, addHabitInstance } from "@/app/actions";

import { prisma } from "@/libs/__mocks__/prisma";
import { AddToDatabaseResponse } from "@/types/prisma";

vi.mock("../libs/prisma");

// helper function to assert the response from the test using the same TypeScript generic used in the server action
function assertResponse<T>(
    testResponse: AddToDatabaseResponse<T>,
    expectedData: T
) {
    expect(testResponse).toEqual({
        success: true,
        data: expectedData,
        error: undefined,
    });
}

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

    assertResponse(test, newHabit);
});

test("Add a Habit Instance to a Users account", async () => {
    const habitInstance = {
        id: "12345",
        target: 15,
        habitDefinitionId: "45678",
        userId: "134",
        completed: false,
        completedAt: null,
        active: true,
    };

    prisma.habitInstance.create.mockResolvedValue(habitInstance);
    const test = await addHabitInstance(habitInstance);

    assertResponse(test, habitInstance);
});
