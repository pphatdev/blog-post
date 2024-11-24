import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/layouts/admin-sidebar";
import { BrowserRouter } from "react-router-dom";
import { AdminHeader } from './admin-header';

export default function Layout({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <AdminSidebar />
                <main className="w-full">
                    <AdminHeader/>
                    <div className="w-full max-w-3xl mx-auto h-full p-5">
                        { children }
                    </div>
                </main>
            </SidebarProvider>
        </BrowserRouter>
    );
}
