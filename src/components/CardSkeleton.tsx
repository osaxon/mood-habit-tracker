import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function CardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-12 w-full" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-12 w-full" />
            </CardFooter>
        </Card>
    );
}
