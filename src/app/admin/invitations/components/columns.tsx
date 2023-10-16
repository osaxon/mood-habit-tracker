"use client";

import { Invitations } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Invitations>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "expiry",
        header: "Expires",
    },
    {
        accessorKey: "used",
        header: "Used",
    },
];
