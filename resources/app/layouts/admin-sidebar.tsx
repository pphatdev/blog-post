import React from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarTrigger, } from "@/components/ui/sidebar"
import { Calendar, ChevronRight, ChevronUp, Cog, CopyIcon, EllipsisVerticalIcon, Home, Inbox, PencilIcon, Plus, Search, Settings, TrashIcon, User2 } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IconFrame } from "@/components/utils/icon-frame"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Skeleton } from "@components/ui/skeleton"
import { AdminSidebarFooter } from '@components/admin-sidebar-footer';


const HeaderSidebar = () => {
    return (
        <div className="flex flex-col items-center justify-center px-4 pb-2 py-5 text-gray-500">
            <Avatar>
                <AvatarImage src="https://github.com/pphatdev.png" />
                <AvatarFallback>PP</AvatarFallback>
            </Avatar>
            <div className="mt-2 text-lg font-bold">PPhat DEv</div>
        </div>
    )
}

const LoadingSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="flex gap-4 items-center max-w-lg w-full mx-auto justify-between px-4 py-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-full max-w-44" />
            </SidebarHeader>
            <SidebarContent className=" overflow-x-hidden p-3">
                <SidebarMenu>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuSkeleton showIcon />
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}

const ContentSidebar = () => {
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
        <SidebarContent className="overflow-x-hidden p-3">
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
                                        <SidebarMenuSubItem className="relative">
                                            <SidebarMenuSubButton className="flex peer w-full justify-between" href={child.url}>
                                                <span className="w-full">{child.title}</span>
                                            </SidebarMenuSubButton>

                                            <div className="absolute right-2 top-0.5 focus-within:opacity-100 active:opacity-100 opacity-0 hover:opacity-100 peer-hover:opacity-100 transition-opacity">
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
    )
}

const FooterSidebar = () => {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <AdminSidebarFooter/>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export function AdminSidebar() {
    const [isLoading, setIsLoading] = React.useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 1000)

    if (isLoading) {
        return <LoadingSidebar />
    }

    return (
        <Sidebar>
            <HeaderSidebar />
            <ContentSidebar />
            <FooterSidebar />
        </Sidebar>
    )
}
