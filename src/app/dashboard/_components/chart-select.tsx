import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ChartSelect() {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue defaultValue="line" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
            </SelectContent>
        </Select>
    );
}