"use client";

import { TabsContent } from "./ui/tabs";

export default function Activities() {
    return (
        <TabsContent className="@container" value="activities">
            <h2 className="py-6">Activities</h2>
            <div className="grid @lg:grid-cols-2 gap-2"></div>
        </TabsContent>
    );
}
