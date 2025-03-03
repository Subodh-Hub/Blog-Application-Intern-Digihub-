import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarRail,
    SidebarSeparator,
} from '@/components/ui/sidebar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { User, KeyRound, Orbit, ChevronUp, User2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'

const SettingSidebar = () => {
    const navigate = useNavigate()
    const items = [
        {
            title: 'Update Profile',
            url: '/setting/updateProfile',
            icon: User,
        },
        {
            title: 'Change Password',
            url: '/setting/changePassword',
            icon: KeyRound,
        },
    ]
    const {userInf} = useAuth()

    return (
        <Sidebar
            style={{ position: 'absolute' }}
            collapsible="icon"
            variant="floating"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            <Orbit />
                            <span>DGBlog</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent style={{ position: 'relative' }}>
                <SidebarGroup>
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
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {userInf?.firstName}{' '}
                                    {userInf?.lastName}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width] bg-white border border-gray-200 rounded-lg shadow-lg"
                            >
                                <DropdownMenuItem
                                    className="w-full px-4 py-2 text-center cursor-pointer hover:bg-gray-100"
                                    onClick={() => navigate('/profile/overview')}
                                >
                                    <span className="capitalize">
                                        {userInf?.firstName} {userInf?.lastName}
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="w-full px-4 py-2 text-center cursor-pointer hover:bg-gray-100"
                                    onClick={() => logout()}
                                >
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default SettingSidebar
