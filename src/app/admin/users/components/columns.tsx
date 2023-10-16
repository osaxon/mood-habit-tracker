"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "emailVerified",
        header: "Verified",
        cell: ({ row }) => {
            const date: Date = row.getValue("emailVerified");
            const formatted = dayjs(date).format("DD MMM YY");
            return <div>{formatted}</div>;
        },
    },
];
