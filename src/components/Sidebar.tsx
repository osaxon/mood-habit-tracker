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
                "relative transition-all duration-300 px-2",
                { "w-64": isOpen },
                { "w-5": !isOpen }
            )}
        >
            <Navigation />
            <div className="absolute top-1/3 right-2">
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
