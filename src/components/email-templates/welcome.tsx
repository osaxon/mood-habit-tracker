"use client";
import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WelcomeEmailProps {
    userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

console.log(baseUrl, "<----- base url");

export const WelcomeEmail = ({ userFirstname = "Zeno" }: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>
            The habit tracking service that helps achieve your goals.
        </Preview>
        <Tailwind>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`${baseUrl}/lotus-flower.png`}
                        width="170"
                        height="170"
                        alt="Lotus flower logo"
                        style={logo}
                    />
                    <Text style={paragraph}>Hi {userFirstname},</Text>
                    <Text style={paragraph}>
                        You&apos;ve been invited to join Hab:It as an early
                        adopter. Click the link below to log in.
                    </Text>
                    <Section style={btnContainer}>
                        <Button
                            className="px-4 py-3 cursor-pointer rounded bg-emerald-500 text-2xl"
                            href={baseUrl}
                        >
                            Sign Up
                        </Button>
                    </Section>
                    <Text style={paragraph}>
                        Best,
                        <br />
                        The Hab:It team
                    </Text>
                    <Hr style={hr} />
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default WelcomeEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#5F51E8",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
