import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function isObject(value: unknown): value is Record<string, unknown> {
    // check that value is object
    return !!value && !Array.isArray(value) && typeof value === "object";
}

export function getMessageFromUnknownError(
    err: unknown,
    fallback: string
): string {
    if (typeof err === "string") {
        return err;
    }
    if (isObject(err) && typeof err.message === "string") {
        return err.message;
    }
    return fallback;
}

export function getCauseFromUnknown(cause: unknown) {
    if (cause instanceof Error) {
        return cause;
    }

    return undefined;
}
