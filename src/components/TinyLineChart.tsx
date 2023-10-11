"use client";
import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

export default function TinyLineChart({
    data,
    target,
}: {
    data: any;
    target: number;
}) {
    const [color, setColor] = useState<string>(""); // default value can be a fallback color

    useEffect(() => {
        let isMounted = true; // to track if the component is still mounted

        // We use a timeout to let the browser finish painting before computing the style
        const timer = setTimeout(() => {
            if (isMounted) {
                const computedColor = getComputedStyle(
                    document.documentElement
                ).getPropertyValue("--primary");
                setColor(computedColor);
            }
        }, 50); // a short delay, can be adjusted

        return () => {
            isMounted = false; // mark it so we don't update state after component is unmounted
            clearTimeout(timer); // clear the timer if the component is unmounted
        };
    }, []); // this effect will run once, similar to componentDidMount

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Line
                    type="monotone"
                    dataKey="value"
                    strokeWidth={2}
                    stroke={`hsl(${color})`}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
