import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <div className="flex h-screen">
                <div className="bg-transparent transition-all duration-300  h-screen flex-shrink-0 sticky top-0">
                    <Sidebar />
                </div>
                <div className="w-[85%] flex-grow overflow-auto h-screen">
                    <main className="p-5 pb-28">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout
