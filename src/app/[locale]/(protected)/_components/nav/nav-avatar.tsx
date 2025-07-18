import { CircleUser, LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "../../_actions";
import { Link } from "@/i18n";

/**
 * NavAvatar
 */
export const NavAvatar = async () => {
  const session = await getSession();
  const t = await getTranslations("nav");

  const avatar = (
    <Avatar className="size-9">
      {session.user.image && <AvatarImage src={session.user.image} />}
      <AvatarFallback>{session.user.name ?? "USER"}</AvatarFallback>
    </Avatar>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto rounded-full">
          {avatar}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={-10} sideOffset={10}>
        <DropdownMenuLabel className="flex gap-2 py-2 font-normal">
          {avatar}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{session.user.name ?? ""}</span>
            <span className="text-muted-foreground truncate text-xs">
              {session.user.email ?? ""}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* テーマ */}
        <DropdownMenuGroup>
          <ModeToggle />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* その他諸々 */}
        <Link href={`/profile/${session.operatorId}`} scroll={false}>
          <DropdownMenuItem className="h-9">
            <CircleUser size={16} />
            {t("profile")}
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem asChild className="cursor-pointer">
          <LocaleSwitcher variant="ghost" className="font-normal" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* ログアウト */}
        <DropdownMenuGroup className="p-0">
          <DropdownMenuItem asChild className="w-full py-0">
            <form action={signOutAction}>
              <Button variant={"ghost"} size={"icon"} className="h-9 w-full justify-start p-0">
                <LogOut size={16} />
                {t("signOut")}
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
