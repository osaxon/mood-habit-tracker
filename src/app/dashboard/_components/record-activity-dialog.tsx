"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ActivityIcon } from "lucide-react";
export default function RecordActivityModal({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <Button asChild>
                <DialogTrigger>
                    <ActivityIcon />
                    Add Data
                </DialogTrigger>
            </Button>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}
