import { auth } from "./lib/authconfig";

export default async function Home() {
    const session = await auth();
    return <main></main>;
}
