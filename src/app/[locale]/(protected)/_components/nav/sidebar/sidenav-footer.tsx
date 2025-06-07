import { ChevronsUpDown, CircleUser, Cog, LogOut } from "lucide-react";
import { getTranslations } from "next-intl/server";
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
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOutAction } from "../../../_actions";
import { auth } from "@/auth";
import { Link } from "@/i18n";

/**
 * SideNavFooterContainer
 */
export const SideNavFooterContainer = async () => {
  const session = await auth();
  const t = await getTranslations("sidebar.footer");

  const avatarLabel = (
    <>
      <Avatar className="size-9 group-data-[collapsible=icon]:size-8">
        {session?.user.image && <AvatarImage src={session.user.image} />}
        <AvatarFallback>{session?.user.name ?? "USER"}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{session?.user.name ?? ""}</span>
        <span className="text-muted-foreground truncate text-xs">{session?.user.email}</span>
      </div>
    </>
  );

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            {/* トリガー */}
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size={"lg"}
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {avatarLabel}
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              {/* ユーザーラベル */}
              <DropdownMenuLabel className="flex gap-2 py-2 font-normal">
                {avatarLabel}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* テーマ */}
              <DropdownMenuGroup>
                <ModeToggle />
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* その他諸々 */}
              <Link href={`/profile/${session?.operatorId}`} scroll={false}>
                <DropdownMenuItem className="h-9">
                  <CircleUser size={16} />
                  {t("profile")}
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem className="h-9" disabled>
                <Cog size={16} />
                {t("setting")}
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer">
                <LocaleSwitcher variant="ghost" className="font-normal" />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* ログアウト */}
              <DropdownMenuGroup className="p-0">
                <DropdownMenuItem asChild className="w-full py-0">
                  <form action={signOutAction}>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="h-9 w-full justify-start p-0"
                    >
                      <LogOut size={16} />
                      {t(`signOut`)}
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
