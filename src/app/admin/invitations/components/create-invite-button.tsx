"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateInviteForm } from "./create-invite-form";

export function CreateInviteButton() {
    return (
        <Dialog>
            <Button variant="secondary" asChild>
                <DialogTrigger>Create</DialogTrigger>
            </Button>
            <DialogContent>
                <CreateInviteForm />
            </DialogContent>
        </Dialog>
    );
}
