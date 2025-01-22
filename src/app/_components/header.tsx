import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SidebarSheet from "./sidebar-sheet";

export function Header() {
  return (
    <Card>
      <CardContent className="justify-between item-center flex flex-row p-5">
        <Image alt="logo" src="/logo.png" priority height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  );
}
