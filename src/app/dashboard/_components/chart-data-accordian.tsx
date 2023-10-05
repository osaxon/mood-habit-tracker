import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function ChartDataAccordian(data: any) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Detail</AccordionTrigger>
                <AccordionContent>
                    <pre>
                        <code>{JSON.stringify(data, null, 2)}</code>
                    </pre>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
