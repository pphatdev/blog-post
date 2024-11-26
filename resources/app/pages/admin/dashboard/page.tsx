import React from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@components/ui/breadcrumb"
import { Separator } from "@components/ui/separator"
import { SidebarTrigger, } from "@/components/ui/sidebar"
import Layout from "../layouts/layouts"
import { cn } from "@/lib/utils"
import { HeaderStats } from './components/header-stats';

export default function Dashboard() {
    const stats = [
        { name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive' },
        { name: 'Overdue invoices', value: '$12,787.00', change: '+54.02%', changeType: 'negative' },
        { name: 'Outstanding invoices', value: '$245,988.00', change: '-1.39%', changeType: 'positive' },
        { name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative' },
    ]
    return (
        <Layout>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                    <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                        {stats.map((stat, statIdx) => (
                            <div
                                key={stat.name}
                                className={cn(
                                    statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                                    'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8',
                                )}
                            >
                                <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
                                <dd
                                    className={cn(
                                        stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
                                        'text-xs font-medium',
                                    )}
                                >
                                    {stat.change}
                                </dd>
                                <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div> */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <HeaderStats/>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
        </Layout>
    )
}
