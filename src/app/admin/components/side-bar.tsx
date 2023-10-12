"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import {
    AtSignIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CogIcon,
    LayoutDashboardIcon,
    UsersIcon,
    type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

interface NavLinks {
    label: string;
    href: string;
    icon: LucideIcon;
}

const navLinks: NavLinks[] = [
    {
        label: "Dashboard",
        href: "/",
        icon: LayoutDashboardIcon,
    },
    {
        label: "Users",
        href: "/",
        icon: UsersIcon,
    },
    {
        label: "Invitations",
        href: "/",
        icon: AtSignIcon,
    },
    {
        label: "Config",
        href: "/",
        icon: CogIcon,
    },
];

export function SideBar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    // Function to handle window resize event
    const handleResize = () => {
        // Check the window width and set shouldAutoOpen accordingly
        if (window.innerWidth <= 640 && isOpen) {
            // You can adjust the width threshold as needed
            setIsOpen(false);
        } else {
            setIsOpen(true);
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
                "admin-nav relative bg-secondary transition-all flex-col",
                { "w-48": isOpen },
                { "w-[31px]": !isOpen }
            )}
        >
            <Button
                className="absolute bottom-1 right-1 w-6 h-6"
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <ChevronLeftIcon className="w-4 h-4" />
                ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                )}
            </Button>
            {isOpen ? (
                <ul className="flex flex-col">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <Button
                                size="sm"
                                className="w-full justify-start"
                                variant="ghost"
                            >
                                <link.icon className="mr-2" />
                                {link.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </aside>
    );
}
