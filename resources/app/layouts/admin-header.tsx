import React from 'react';
import { SearchCommand } from '@/components/search-command';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Notifications } from '@/components/notifications';
import { AdminHeaderProfile } from '@/components/admin-header-profile';


export const AdminHeader = () => {
    return (
        <header className='sticky top-0 z-[9999] bg-background/50 backdrop-blur-xl w-full border-b'>
            <div className="z-50 flex items-center justify-between px-2 mx-auto max-w-8xl">
                <div className="flex items-center justify-between w-64 gap-4 px-1 py-2">
                    <SidebarTrigger />
                </div>
                <nav className="flex items-center justify-end gap-4 px-4 py-2">
                    <ul className="flex items-center justify-end gap-2">
                        <li className="flex items-center">
                            <SearchCommand />
                            <Notifications />
                        </li>
                        <li>
                            <AdminHeaderProfile />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}