"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
export default function RecordActivityModal({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <Button variant="secondary" asChild>
                <DialogTrigger>Record Activity Details</DialogTrigger>
            </Button>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}
