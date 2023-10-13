import Container from "@/components/container";
import { GetServerSidePropsContext } from "next";

export default async function SignUpPage(context: GetServerSidePropsContext) {
    return (
        <Container height="page" width="wide">
            <p>Verify</p>
            <Container width="narrow">Verify the request</Container>
        </Container>
    );
}
