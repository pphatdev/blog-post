import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import NextTopLoader from "nextjs-toploader";
import { AppSidebar } from "../dashboard/components/app-sidebar";
import { BrowserRouter as Router } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Router>
            <SidebarProvider>
                <NextTopLoader />
                <AppSidebar />
                <SidebarInset>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </Router>
    )
}
