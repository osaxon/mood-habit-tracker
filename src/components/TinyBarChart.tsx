"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

export default function TinyBarChart({
    data,
    target,
}: {
    data: any;
    target: number;
}) {
    const { value } = data;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={80} data={data}>
                <XAxis
                    interval="preserveStartEnd"
                    minTickGap={6}
                    dataKey="date"
                />
                <Bar dataKey="value" className="fill-primary opacity-60" />
            </BarChart>
        </ResponsiveContainer>
    );
}
