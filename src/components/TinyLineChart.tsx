"use client";
import { Line, LineChart, ResponsiveContainer } from "recharts";

type CustomDotProps = {
    cy?: number;
    cx?: number;
    value?: number;
    target?: number;
};

export default function TinyLineChart({
    data,
    target,
}: {
    data: any;
    target: number;
}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Line
                    stroke="hsl(142.1 76.2% 36.3%)"
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
