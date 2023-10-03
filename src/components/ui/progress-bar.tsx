import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/libs/utils";

const progressBarVariants = cva(
    "bg-emerald-500 flex items-center rounded transition-all",
    {
        variants: {
            size: {
                default: "p-2",
                sm: "p-0.5",
                lg: "p-3",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

export interface ProgressBarProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof progressBarVariants> {
    progress?: number;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, progress, size = "default", ...props }, ref) => (
        <div
            ref={ref}
            className={cn("bg-emerald-100 rounded w-full my-2", className)}
            {...props}
        >
            <div
                className={cn(progressBarVariants({ size }), className)}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
