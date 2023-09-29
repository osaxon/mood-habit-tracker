import { auth } from "../libs/authconfig";

export default async function Home() {
    const session = await auth();
    return <section></section>;
}
