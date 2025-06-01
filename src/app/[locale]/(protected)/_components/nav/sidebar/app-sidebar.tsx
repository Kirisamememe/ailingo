import { useTranslations } from "next-intl";
import { FlexRow } from "@/components/ui/flexbox";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { aiBoosterItems, generalItems } from "../items";
import { Logo } from "./logo";
import { LogoText } from "./logo-text";
import { NavLink } from "./nav-link";
import { SideNavFooterContainer } from "./sidenav-footer";
import { Link } from "@/i18n";

/**
 * AppSidebar
 */
export const AppSidebar = () => {
  const t = useTranslations("sidebar");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 transition-all group-data-[collapsible=icon]:p-2">
        <Link href={"/"}>
          <FlexRow gap={3} centerY className="shrink-0">
            <Logo />
            <LogoText />
          </FlexRow>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* General */}
        <SidebarGroup>
          <SidebarGroupLabel>{t("titles.general")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink title={t(item.title)} url={item.url}>
                      <item.icon />
                      <span>{t(item.title)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Booster */}
        <SidebarGroup>
          <SidebarGroupLabel>{t("titles.aiBooster")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiBoosterItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink title={t(item.title)} url={item.url}>
                      <item.icon />
                      <span>{t(item.title)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SideNavFooterContainer />
      <SidebarRail />
    </Sidebar>
  );
};
