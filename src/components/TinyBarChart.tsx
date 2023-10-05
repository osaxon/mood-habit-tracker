"use client";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

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
            <BarChart width={150} height={100} data={data}>
                <Bar dataKey="value" className="fill-primary opacity-60" />
            </BarChart>
        </ResponsiveContainer>
    );
}
