import React from "react"
import { Keyboard, Settings, User, } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { PiSignOut } from "react-icons/pi"

export const AdminHeaderProfile = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src="https://github.com/pphatdev.png" alt="@pphatdev" />
                    <AvatarFallback>PP</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="w-4 h-4 mr-2" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Keyboard className="w-4 h-4 mr-2" />
                        <span>Keyboard shortcuts</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-danger">
                        <PiSignOut className="w-4 h-4 mr-2" />
                        <span>Sign out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
