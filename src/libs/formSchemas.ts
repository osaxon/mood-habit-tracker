import { z } from "zod";
import { TargetFrequency, TargetUnit } from "@prisma/client";

export const addHabitSchema = z.object({
    habitId: z.string(),
    userId: z.string(),
    target: z.coerce.number().min(1),
    targetUnit: z.nativeEnum(TargetUnit),
    targetFreq: z.nativeEnum(TargetFrequency),
});

export const addHabitRecordSchema = z.object({
    value: z.number(),
    habitInstanceId: z.string(),
    userId: z.string(),
});

export type AddHabitInstanceInputs = z.infer<typeof addHabitSchema>;
export type AddHabitRecordInputs = z.infer<typeof addHabitRecordSchema>;
