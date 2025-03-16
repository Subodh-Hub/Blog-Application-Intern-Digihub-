// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider'
import { PostStatsProvider } from './context/PostStatusContext'

createRoot(document.getElementById('root')).render(
        <AuthProvider>
            <PostStatsProvider>
                <App />
            </PostStatsProvider>
        </AuthProvider>

)
