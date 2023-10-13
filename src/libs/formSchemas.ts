import { z } from "zod";

export const addHabitRecordSchema = z.object({
    value: z.coerce.number(),
    habitInstanceId: z.string(),
    userId: z.string(),
    createdDate: z.date({
        required_error: "Created Date is required.",
    }),
});

export const addHabitInstanceSchema = z.object({
    habitDefinitionId: z.string(),
    userId: z.string(),
});

export const authFormSchema = z.object({
    email: z.string().email(),
    csrfToken: z.string(),
});

export type AddHabitInstanceInputs = z.infer<typeof addHabitInstanceSchema>;
export type AddHabitRecordInputs = z.infer<typeof addHabitRecordSchema>;
export type AuthFormInputs = z.infer<typeof authFormSchema>;
