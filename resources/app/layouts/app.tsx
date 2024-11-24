import React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { BrowserRouter } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <AdminSidebar />
                <main className="w-full">
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </BrowserRouter>
    );
}
