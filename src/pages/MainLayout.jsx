import React from 'react'
import { useOutlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeProvider'

const MainLayout = () => {
    const outlet = useOutlet()
    return (
        <ThemeProvider>
            <Navbar />
            {outlet}
            <Footer />
        </ThemeProvider>
    )
}

export default MainLayout
