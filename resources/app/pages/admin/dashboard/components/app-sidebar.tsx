"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot,
    ChartPieIcon,
    Command,
    ContactRound,
    Frame,
    GalleryVerticalEnd,
    Inbox,
    Map,
    PieChart,
    RssIcon,
    Settings2,
    SquareKanban,
    SquareTerminal,
    TargetIcon,
} from "lucide-react"

import { BiSolidDoughnutChart } from "react-icons/bi";

import { NavMain } from "@/pages/admin/dashboard/components/nav-main"
import { NavProjects } from "@/pages/admin/dashboard/components/nav-projects"
import { NavUser } from "@/pages/admin/dashboard/components/nav-user"
import { TeamSwitcher } from "@/pages/admin/dashboard/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This is sample data.
const data = {
    user: {
        name: "PPhatDev",
        email: "info@leatsophat.me",
        avatar: "https://leatsophat.me/assets/profile.png",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Overview",
            url: "#",
            icon: ChartPieIcon,
            isActive: true
        },
        {
            title: "Blogs",
            url: "#",
            icon: RssIcon,
            isActive: false,
            items: [
                {
                    title: "New",
                    url: "#",
                },
                {
                    title: "Draft",
                    url: "#",
                },
                {
                    title: "Published",
                    url: "#",
                },
            ],
        },
        {
            title: "Projects",
            url: "#",
            icon: SquareKanban,
            isActive: false,
            items: [
                {
                    title: "New",
                    url: "#",
                },
                {
                    title: "Draft",
                    url: "#",
                },
                {
                    title: "Published",
                    url: "#",
                },
            ],
        },
        {
            title: "About Me",
            url: "#",
            icon: ContactRound,
            isActive: false,
            items: [
                {
                    title: "New",
                    url: "#",
                },
                {
                    title: "Draft",
                    url: "#",
                },
                {
                    title: "Published",
                    url: "#",
                },
            ],
        },
        {
            title: "Messages",
            url: "#",
            icon: Inbox,
            isActive: false,
            items: [
                {
                    title: "Hired",
                    url: "#",
                },
                {
                    title: "Discussions",
                    url: "#",
                }
            ],
        },
    ],
    projects: [
        {
            name: "Blogs",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={'https://leatsophat.me/assets/profile.png'} alt={'user.name'} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">LEAT Sophat</span>
                                    <span className="truncate text-xs">leatsophat.me</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
