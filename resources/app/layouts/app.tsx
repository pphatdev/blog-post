import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/layouts/admin-sidebar";
import { BrowserRouter } from "react-router-dom";
import { AdminHeader } from './admin-header';
import { cn } from "@/lib/utils";

export default function Layout({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <AdminSidebar />
                <main className="w-full">
                    <AdminHeader/>
                    <div className={cn("w-full mx-auto h-full p-5", className)}>
                        { children }
                    </div>
                </main>
            </SidebarProvider>
        </BrowserRouter>
    );
}
