import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AppSidebar } from "./_components/sidebar/sidebar";
import { CurrentGroupProvider } from "@/contexts/group-update-context";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <header className="border p-2">
                    <SidebarTrigger />
                </header>
                <CurrentGroupProvider>
                    <div className="max-w-7xl w-full m-auto">
                        {children}
                    </div>
                </CurrentGroupProvider>
            </div>
        </SidebarProvider>
    )
}