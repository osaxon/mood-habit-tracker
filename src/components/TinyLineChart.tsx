"use client";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const data = [
    {
        name: "Page A",
        uv: 2800,
        pv: 2100,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 2800,
        pv: 2300,
        amt: 2400,
    },
    {
        name: "Page C",
        uv: 2800,
        pv: 2500,
        amt: 2400,
    },
    {
        name: "Page D",
        uv: 2800,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page E",
        uv: 2800,
        pv: 2800,
        amt: 2400,
    },
    {
        name: "Page F",
        uv: 2800,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page G",
        uv: 2800,
        pv: 1900,
        amt: 2400,
    },
];

export default function TinyLineChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Line
                    stroke="hsl(142.1 76.2% 36.3%)"
                    type="monotone"
                    dataKey="pv"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
