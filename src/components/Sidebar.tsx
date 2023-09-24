"use client";
import Navigation from "@/app/dashboard/navigation";
import { cn } from "@/lib/utils";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [shouldAutoOpen, setShouldAutoOpen] = useState<boolean>(true);

    // Function to handle window resize event
    const handleResize = () => {
        // Check the window width and set shouldAutoOpen accordingly
        if (window.innerWidth <= 640) {
            // You can adjust the width threshold as needed
            setShouldAutoOpen(false);
        } else {
            setShouldAutoOpen(true);
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

    useEffect(() => {
        // Automatically open/close the sidebar based on shouldAutoOpen
        if (shouldAutoOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [shouldAutoOpen]);

    return (
        <aside
            className={cn(
                "relative transition-all duration-300",
                { "w-64": isOpen },
                { "w-5": !isOpen }
            )}
        >
            <Navigation />
            <div className="absolute top-1/3 right-0">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="icon"
                    variant="ghost"
                >
                    {isOpen ? (
                        <DoubleArrowLeftIcon />
                    ) : (
                        <DoubleArrowRightIcon />
                    )}
                </Button>
            </div>
        </aside>
    );
}
