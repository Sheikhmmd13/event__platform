import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator"

import Image from "next/image";
import NavItems from "./NavItems";

function MobileNav() {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger className="align-middle">
                              <Image src={'/assets/icons/menu.svg'} className="cursor-pointer" width={24} height={24} alt="menu-icon"/>
                        </SheetTrigger>
				<SheetContent className="flex flex-col gap-6 bg-white md:hidden">
					<Image src={'/assets/images/logo.svg'} width={128} height={38} alt="logo"/>
                              <Separator className="bordder border-gray-50"/>
                              <NavItems />
				</SheetContent>
			</Sheet>
		</nav>
	);
}

export default MobileNav;
