import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") ?? null;
    useEffect(() => {
        if (token) {
            window.scrollTo(0, 0);
            navigate(location.pathname)
        } else {
            navigate('/login');
        }
    }, [token]);


    return (
        <>
            <div className="flex h-screen">
                <div className="bg-transparent transition-all duration-300 flex-shrink-0 sticky top-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <Sidebar />
                </div>
                <div className="w-[85%] flex-grow   h-full overflow-y-auto">
                    <main className="p-5 pb-5 ">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default Layout
