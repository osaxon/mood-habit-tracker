"use client";
import { addHabitInstance } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function AddHabitButton({
    habitDefinitionId,
    userId,
}: {
    habitDefinitionId: string;
    userId: string;
}) {
    const [loading, setLoading] = useState<boolean>(false);

    const inputs = {
        habitDefinitionId,
        userId,
    };
    const handleSubmit = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            await addHabitInstance(inputs);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Button disabled={loading} onClick={handleSubmit}>
            {loading && <ReloadIcon className="mr-2 w-4 animate-spin" />}
            {loading ? "Please wait" : "Accept challenge"}
        </Button>
    );
}
