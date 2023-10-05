"use client";
import {
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    XAxis,
} from "recharts";

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
    console.log(target);
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <XAxis
                    interval="preserveStartEnd"
                    minTickGap={6}
                    dataKey="date"
                />
                <ReferenceLine ifOverflow="extendDomain" y={target} />
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
