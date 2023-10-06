"use client";
import TinyBarChart from "@/components/TinyBarChart";
import TinyLineChart from "@/components/TinyLineChart";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChartIcon, LineChartIcon } from "lucide-react";
import { useState } from "react";

interface ChartData {
    date: string;
    value: number;
}

interface UserHabitCardProps {
    freqLabel: string;
    chartData: ChartData[];
    targetValue: number;
}

export default function UserHabitCardContent({
    freqLabel,
    chartData,
    targetValue,
}: UserHabitCardProps) {
    const [selected, setSelected] = useState<string>("line");

    return (
        <div className="flex flex-col gap-4">
            <p>Your progress for the last 7 {freqLabel}&apos;s</p>

            <div className="h-32 relative">
                {selected === "line" ? (
                    <TinyLineChart data={chartData} target={targetValue} />
                ) : (
                    <TinyBarChart data={chartData} target={targetValue} />
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="absolute -top-24 -right-4"
                        asChild
                    >
                        <Button size="icon" variant="ghost" className="rounded">
                            {selected === "line" ? (
                                <LineChartIcon className="w-4 h-4 text-neutral-400" />
                            ) : (
                                <BarChartIcon className="w-4 h-4 text-neutral-400" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Chart type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={selected}
                            onValueChange={setSelected}
                        >
                            <DropdownMenuRadioItem value="line">
                                Line
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bar">
                                Bar
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* <ChartDataAccordian data={chartData} /> */}
        </div>
    );
}
