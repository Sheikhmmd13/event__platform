"use client";

import { headerLinks } from "@/config/constans";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavItems() {
	const pathName = usePathname();

	return (
		<ul className="md:justify-between flex w-full flex-col items-start gap-5 md:flex-row">
			{headerLinks.map((link) => {
				const isActive = pathName === link.route;

				return (
					<li
						key={link.route}
						className={`${
							isActive && "text-primary-500"
						} justify-center font-medium whitespace-nowrap`}>
						<Link href={link.route}>{link.label}</Link>
					</li>
				);
			})}
		</ul>
	);
}

export default NavItems;
