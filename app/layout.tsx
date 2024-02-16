import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Evently",
	description: "A Platform for manage platform",
	icons: {
		icon: "/assets/images/logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={poppins.variable}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
