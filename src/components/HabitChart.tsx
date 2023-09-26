import { getBarChartData } from "@/app/actions";
import TinyBarChart from "./TinyBarChart";

export default async function HabitChart({
    habitId,
    target,
}: {
    habitId: string;
    target: number;
}) {
    let chartData = await getBarChartData(habitId);
    console.log(chartData);
    return <TinyBarChart target={target} data={chartData} />;
}
