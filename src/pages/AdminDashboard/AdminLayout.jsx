import AdminSidebar from '@/components/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/context/ThemeProvider'
import React from 'react'
import { useOutlet } from 'react-router-dom'

const AdminLayout = () => {
    const outlet = useOutlet()
  return (
    <ThemeProvider>
            <SidebarProvider defaultOpen={true}>
                <AdminSidebar />
                <main className="w-screen">
                    <SidebarTrigger />

                    {outlet}
                </main>
            </SidebarProvider>
        </ThemeProvider>
  )
}

export default AdminLayout