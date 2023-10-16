import { expect, test, vi, describe } from "vitest";
import { addHabitRecord, addHabitInstance, createInvite } from "@/app/actions";
import { prisma, xprisma } from "@/libs/__mocks__/prisma";
import { AddToDatabaseResponse } from "@/types/prisma";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

vi.mock("../libs/prisma");
vi.mock("next/cache", () => {
    const revalidatePath = vi.fn();
    return { revalidatePath };
});

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

describe("Send invitation", () => {
    test("Adds invitation to database", async () => {
        const newInvite = {
            token: "clntbh2ij0002v0xilylm2az4",
            email: "test@test.co.uk",
            used: false,
            expiry: dayjs(new Date()).startOf("day").add(1, "month").toDate(),
        };

        prisma.invitations.create.mockResolvedValue(newInvite);
        const test = await createInvite(newInvite);
        assertResponse(test, newInvite);
    });
});

test("Record a new Habit Record against a Habit Instance", async () => {
    const newHabit = {
        id: "12345",
        value: 10,
        habitInstanceId: "2123",
        userId: "134",
        createdAt: null,
        createdDate: new Date(),
    };

    // test the extended client
    xprisma.userHabitRecord.create.mockResolvedValue(newHabit);
    const test = await addHabitRecord(newHabit);
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard", "page");
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
        percentComplete: 0,
        expiresAt: null,
        active: true,
    };

    prisma.habitInstance.create.mockResolvedValue(habitInstance);
    const test = await addHabitInstance(habitInstance);

    assertResponse(test, habitInstance);
});
