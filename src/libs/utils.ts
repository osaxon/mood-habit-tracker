import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getUserInitials(name: string) {
    if (!name) return "XX";
    const [first, last] = name.split(" ");
    return `${first.charAt(0)}${last.charAt(0)}`;
}
