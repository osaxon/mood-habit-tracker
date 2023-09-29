import { z } from "zod";
import { TargetFrequency, TargetUnit, HabitDefinition } from "@prisma/client";

export const addHabitRecordSchema = z.object({
    value: z.number(),
    habitInstanceId: z.string(),
    userId: z.string(),
});

export const addHabitInstanceSchema = z.object({
    habitDefinitionId: z.string(),
    userId: z.string(),
});

export type AddHabitInstanceInputs = z.infer<typeof addHabitInstanceSchema>;
export type AddHabitRecordInputs = z.infer<typeof addHabitRecordSchema>;
