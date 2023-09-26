"use client";
import { Bar, BarChart, ReferenceLine, ResponsiveContainer } from "recharts";

export default function TinyBarChart({
    data,
    target,
}: {
    data: any;
    target: number;
}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={80} data={data}>
                <ReferenceLine y={target} label="Target" />
                <Bar dataKey="value" className="fill-primary opacity-60" />
            </BarChart>
        </ResponsiveContainer>
    );
}
