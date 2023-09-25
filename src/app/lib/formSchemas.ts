"use client";

import { z } from "zod";
import { TargetUnit } from "@prisma/client";

export const addHabitSchema = z.object({
    habitId: z.string(),
    userId: z.string(),
    target: z.coerce.number().min(1),
    targetUnit: z.nativeEnum(TargetUnit),
});
