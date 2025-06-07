"use client";

import { routes } from "@/utils/routes";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SwitchTheme } from "@/components/swith-theme";
import { logOut } from "@/(actions)/logOut";

export function AppSidebar() {

    const path = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    account
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem onClick={logOut}>
                                    sair <LogOut />
                                </DropdownMenuItem>
                                <div className="flex text-sm gap-5 p-2">
                                    <p>dark mod</p>
                                    <SwitchTheme />
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Amigo secreto</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="hover:bg">
                            {routes.map(route => (
                                <SidebarMenuItem key={route.title} className={`
                                   ${route.url == path && "bg-secondary rounded-md"}
                                `}>
                                    <SidebarMenuButton asChild>
                                        <Link href={route.url} prefetch={false}>
                                            <route.icon />
                                            <span>{route.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    );
}