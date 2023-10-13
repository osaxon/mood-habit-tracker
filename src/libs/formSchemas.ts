import { z } from "zod";

export const addHabitRecordSchema = z.object({
    value: z.coerce.number(),
    habitInstanceId: z.string(),
    userId: z.string(),
    createdDate: z.date({
        required_error: "Created Date is required.",
    }),
});

export const updateUserRecord = z.object({
    id: z.string().optional(),
    email: z.string().email().optional(),
    data: z
        .object({
            name: z.string().optional(),
            email: z.string().optional(),
            image: z.string().url().optional(),
        })
        .optional(),
});

export const addHabitInstanceSchema = z.object({
    habitDefinitionId: z.string(),
    userId: z.string(),
});

export const authFormSchema = z.object({
    email: z.string().email(),
});

export const newUserFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
});

export type AddHabitInstanceInputs = z.infer<typeof addHabitInstanceSchema>;
export type AddHabitRecordInputs = z.infer<typeof addHabitRecordSchema>;
export type AuthFormInputs = z.infer<typeof authFormSchema>;
export type NewUserFormInputs = z.infer<typeof newUserFormSchema>;
export type UpdateUserRecordInputs = z.infer<typeof updateUserRecord>;
