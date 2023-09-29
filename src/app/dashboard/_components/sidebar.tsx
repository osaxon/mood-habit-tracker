"use client";
import { cn } from "@/libs/utils";
import {
    DashboardIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    LightningBoltIcon,
    PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";

const navLinks = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: DashboardIcon,
    },
    {
        label: "Habits",
        href: "/dashboard/habits",
        icon: LightningBoltIcon,
    },
    {
        label: "Account",
        href: "/dashboard/account",
        icon: PersonIcon,
    },
];

function Navigation() {
    return (
        <nav>
            <ul className="space-y-4">
                {navLinks.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                        <Link href={href}>
                            <Button
                                className="gap-2 w-full justify-start"
                                variant="ghost"
                                size="lg"
                            >
                                <Icon />
                                {label}
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

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
                "relative transition-all p-4 duration-300",
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
