"use client"; // Error components must be Client Components
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center gap-y-6">
            <AlertTriangle className="w-48 h-48 stroke-destructive" />
            <h2 className="font-bold text-2xl">Something went wrong!</h2>
            <Button
                variant="ghost"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    );
}
