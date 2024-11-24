import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/layouts/admin-sidebar";
import { BrowserRouter } from "react-router-dom";
import { AdminHeader } from './admin-header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <AdminSidebar />
                <main className="w-full">
                    <AdminHeader/>
                    {children}
                </main>
            </SidebarProvider>
        </BrowserRouter>
    );
}
