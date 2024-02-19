import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

function Header() {
	return (
		<header className="w-full border-b">
			<div className="wrapper flex items-center justify-between">
				<Link
					href={"/"}
					className="w-36">
					<Image
						src={"/assets/images/logo.svg"}
						width={128}
						height={38}
						alt="Evently Logo"
					/>
				</Link>

				<SignedIn>
					<nav className="md:justify-between max-md:hidden w-full max-w-sm">
						<NavItems />
					</nav>
				</SignedIn>

				<div className="flex justify-end w-32 gap-3">
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
						<MobileNav />
					</SignedIn>
					<SignedOut>
						<Button
							asChild
							className="rounded-full"
							size="lg">
							<Link href={"/sign-in"}>Login</Link>
						</Button>
					</SignedOut>
				</div>
			</div>
		</header>
	);
}

export default Header;
