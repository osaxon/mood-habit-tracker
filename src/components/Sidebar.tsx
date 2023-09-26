"use client";
import Navigation from "@/app/dashboard/navigation";
import { cn } from "@/libs/utils";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    // Function to handle window resize event
    const handleResize = () => {
        // Check the window width and set shouldAutoOpen accordingly
        if (window.innerWidth <= 640 && isOpen) {
            // You can adjust the width threshold as needed
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Attach the event listener when the component mounts
        window.addEventListener("resize", handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <aside
            className={cn(
                "relative transition-all bg-secondary py-4 duration-300",
                { "w-64": isOpen },
                { "w-0": !isOpen }
            )}
        >
            {isOpen ? <Navigation /> : null}

            <div
                className={cn(
                    "absolute top-1/4",
                    { "right-2": isOpen },
                    { "-right-1 text-secondary-foreground": !isOpen }
                )}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="icon"
                    className="w-6 z-99"
                    variant="secondary"
                >
                    {isOpen ? (
                        <DoubleArrowLeftIcon className="w-4 h-4" />
                    ) : (
                        <DoubleArrowRightIcon className="w-4 h-4" />
                    )}
                </Button>
            </div>
        </aside>
    );
}
