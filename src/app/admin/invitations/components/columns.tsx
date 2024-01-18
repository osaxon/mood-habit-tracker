"use client";
import { sendInviteEmail } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Invitations } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";

const sendToast = (data: any) => {
    toast({
        description: (
            <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
        ),
    });
};

export const columns: ColumnDef<Invitations>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "expiry",
        header: "Expires",
        cell: ({ row }) => (
            <div>{dayjs(row.getValue("expires")).format("DD MMM YY")}</div>
        ),
    },
    {
        accessorKey: "used",
        header: "Used",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const invite = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={async () => {
                                sendToast(invite);
                                await sendInviteEmail({ email: invite.email });
                            }}
                        >
                            Re-send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => sendToast(invite)}>
                            Invalidate
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
