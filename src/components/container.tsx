import { cn } from "@/libs/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

// page height takes up remaining page space minus the header component i.e. 84px
// TODO: Store header height size in config file
const containerVariants = cva("max-w-5xl p-4 mx-auto w-full", {
    variants: {
        height: {
            default: "",
            page: "min-h-[calc(100dvh-84px)]",
        },
    },
    defaultVariants: {
        height: "default",
    },
});

export interface ContainerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof containerVariants> {
    as?: keyof JSX.IntrinsicElements;
}

export default function Container({
    children,
    as = "div",
    className,
    height,
    ...props
}: ContainerProps) {
    return React.createElement(
        as,
        { className: cn(containerVariants({ height }), className), ...props },
        children
    );
}
