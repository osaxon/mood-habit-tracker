"use client";
import { addHabitRecord } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { AddHabitRecordInputs } from "@/libs/formSchemas";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function RecordActivityButton(props: AddHabitRecordInputs) {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            await addHabitRecord(props);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button disabled={loading} onClick={handleSubmit}>
            {loading && <ReloadIcon className="mr-2 w-4 animate-spin" />}
            {loading ? "Please wait" : "Record Activity"}
        </Button>
    );
}
