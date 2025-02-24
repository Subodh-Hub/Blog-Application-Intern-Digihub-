import * as React from 'react'
import {
    CircleGauge,
    Shield,
    Key,
    Settings,
    GalleryVerticalEnd,
} from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar'
import { ModeToggle } from './ModeToggle'
import { useNavigate } from 'react-router-dom'

const items = [
    {
        title: 'Dashboard',
        url: '/adminDashboard',
        icon: CircleGauge,
    },
    {
        title: 'Admin',
        url: '/adminDashboard/createAdmin',
        icon: Shield,
    },

    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
]

function AdminSidebar() {
    // state = "expanded"/"collapsed"
    const { state } = useSidebar()
    const navigate = useNavigate()

    return (
        <Sidebar
            collapsible="icon"
            className="flex flex-col items-center justify-center"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        DGBlog
                                    </span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className="cursor-pointer"
                                    asChild
                                    onClick={() => {
                                        localStorage.removeItem('accessToken')
                                        navigate('/login')
                                    }}
                                >
                                    <a>
                                        <Key />
                                        <span>Signout</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-fit">
                                    <ModeToggle isCollapsed={state} />
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    )
}

export default AdminSidebar
