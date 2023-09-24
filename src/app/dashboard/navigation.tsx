import { Button } from "@/components/ui/button";
import {
    DashboardIcon,
    LightningBoltIcon,
    PersonIcon,
} from "@radix-ui/react-icons";

const navLinks = [
    {
        label: "Dashboard",
        icon: DashboardIcon,
    },
    {
        label: "Activities",
        icon: LightningBoltIcon,
    },
    {
        label: "Account",
        icon: PersonIcon,
    },
];

export default function Navigation() {
    return (
        <nav>
            <ul className="flex flex-col gap-y-2">
                {navLinks.map(({ label, icon: Icon }) => (
                    <li key={label}>
                        <Button
                            className="gap-2 w-full inline-flex justify-start"
                            variant="ghost"
                        >
                            <Icon />
                            {label}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
