import { Button } from "@/components/ui/button";
import {
    DashboardIcon,
    LightningBoltIcon,
    PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const navLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: DashboardIcon,
    },
    {
        label: "Activities",
        href: "/dashboard/activities",
        icon: LightningBoltIcon,
    },
    {
        label: "Account",
        href: "/dashboard/account",
        icon: PersonIcon,
    },
];

export default function Navigation() {
    return (
        <nav>
            <ul className="flex flex-col gap-y-2">
                {navLinks.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                        <Link href={href}>
                            <Button
                                className="gap-2 w-full inline-flex justify-start"
                                variant="ghost"
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
