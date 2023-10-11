import { cn } from "@/libs/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

// page height takes up remaining page space minus the header component i.e. 84px
// TODO: Store header height size in config file
const containerVariants = cva("mx-auto w-full", {
    variants: {
        height: {
            default: "",
            page: "min-h-[calc(100dvh-66px)]",
        },
        width: {
            default: "max-w-5xl",
            wide: "max-w-6xl",
            narrow: "max-w-4xl",
        },
        paddingX: {
            none: "",
            sm: "px-2",
            md: "px-4",
            lg: "px-6",
        },
        paddingY: {
            none: "",
            sm: "py-2",
            md: "py-4",
            lg: "py-6",
        },
    },
    defaultVariants: {
        height: "default",
        width: "default",
        paddingX: "sm",
        paddingY: "sm",
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
    width,
    ...props
}: ContainerProps) {
    return React.createElement(
        as,
        {
            className: cn(containerVariants({ height, width }), className),
            ...props,
        },
        children
    );
}
