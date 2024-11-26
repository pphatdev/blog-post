import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NextTopLoader from "nextjs-toploader";
import { AppSidebar } from "../dashboard/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <NextTopLoader />
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
