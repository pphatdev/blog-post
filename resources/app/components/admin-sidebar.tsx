import React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Calendar, ChevronDown, ChevronRight, CopyIcon, EllipsisVerticalIcon, Home, Inbox, MoreHorizontal, PencilIcon, Plus, Search, Settings, TrashIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IconFrame } from "@/components/utils/icon-frame"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"

export function AdminSidebar() {
    const items = [
        {
            title: "Home",
            url: "#",
            icon: Home,
            children: [
                {
                    title: "Dashboard",
                    url: "#",
                },
                {
                    title: "Analytics",
                    url: "#",
                },
                {
                    title: "Reports",
                    url: "#",
                },
            ]
        },
        {
            title: "Inbox",
            url: "#",
            icon: Inbox,
            children: []
        },
        {
            title: "Calendar",
            url: "#",
            icon: Calendar,
            children: []
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
            children: []
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
            children: []
        },
    ]

    return (
        <Sidebar>
            <SidebarContent className=" overflow-x-hidden">
                <SidebarMenu>
                    {items.map((item, i) => (
                        <Collapsible key={i} defaultOpen className="group/collapsible">
                            <SidebarMenuItem className="relative">
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton asChild>
                                        {item.children.length > 0
                                            ? (
                                                <a href={item.url} className="relative peer group/item">
                                                    <ChevronRight className="absolute hidden group-hover/item:block hover:bg-foreground/10 rounded-sm size-4 left-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                    <item.icon className={"group-hover/item:invisible"} />
                                                    <span>{item.title}</span>
                                                </a>
                                            ) : (
                                                <a href={item.url} className="peer">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            )}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <Link to={'/'} className="absolute bg-background right-4 top-1.5 p-1 rounded-md opacity-0 hover:opacity-100 peer-hover:opacity-100 transition-opacity">
                                    <Plus className="size-3 text-foreground/50" />
                                </Link>


                                {item.children.map((child: { title: string, url: string }, i) =>
                                    <CollapsibleContent key={i} className="w-full">
                                        <SidebarMenuSub className="mr-0">
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton className="flex peer w-full justify-between" href={child.url}>
                                                    <span className="w-full">{child.title}</span>
                                                </SidebarMenuSubButton>

                                                <div className="absolute right-4 top-1.5 focus-within:opacity-100 active:opacity-100 opacity-0 hover:opacity-100 peer-hover:opacity-100 transition-opacity">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <button type="button" className="p-1 border rounded-lg bg-background hover:bg-primary/10 border-primary/10 ">
                                                                <EllipsisVerticalIcon className="w-3 h-3" />
                                                            </button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="w-56" align="start">
                                                            <DropdownMenuGroup>
                                                                <DropdownMenuItem>
                                                                    <IconFrame icon={<PlusCircledIcon className="text-primary" />} />
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm">New</span>
                                                                        <span className="text-xs text-foreground/50">Create a new menu</span>
                                                                    </div>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <IconFrame icon={<CopyIcon className="size-3 text-primary" />} />
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm">Duplicate</span>
                                                                        <span className="text-xs text-foreground/50">Duplicate this menu</span>
                                                                    </div>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <IconFrame icon={<PencilIcon className="size-3 text-primary" />} />
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm">Rename</span>
                                                                        <span className="text-xs text-foreground/50">Rename this menu</span>
                                                                    </div>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <IconFrame icon={<TrashIcon className="size-3 text-danger" />} />
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm">Delete</span>
                                                                        <span className="text-xs text-foreground/50">Delete this menu</span>
                                                                    </div>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuGroup>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                )}
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
