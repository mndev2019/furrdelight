import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import logo from '../assets/Image/logo.svg'

import { FaUserPen, FaUsers } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineAlignLeft, AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineFitScreen, MdOutlinePets } from 'react-icons/md';
import { TbCategoryPlus, TbLabelFilled } from 'react-icons/tb';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { PiDogFill } from 'react-icons/pi';
import { FaProductHunt } from 'react-icons/fa';

const Sidebar = () => {
    const [open, setopen] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const menus = [
        {
            title: "User Type",
            image: <FaUsers />,
            path: "/"

        },
        {
            title: "Banner",
            image: <AiOutlineAlignLeft />,
            path: "/banner"

        },
        {
            title: "Splash",
            image: <MdOutlineFitScreen />,
            path: "/splash",
            // gap: "true"
        },
        {
            title: "Brand",
            image: <TbLabelFilled />,
            path: "/brand",

        },
        {
            title: "Pet Essentials",
            image: <MdOutlinePets />,
            path: "/pet-essential"

        },
        {
            title: "Pet Type",
            image: <BiSolidCategoryAlt />,
            path: "/pet-type"

        },
        {
            title: "Pet Category",
            image: <TbCategoryPlus />,
            path: "/pet-category"

        },
        {
            title: "Pet Breed",
            image: <PiDogFill />,
            path: "/pet-breed"
            // gap: "true"
        },
        {
            title: "Add Product",
            image: <FaProductHunt />,
            path: "/add-product"
            // gap: "true"
        },
      

    ]
    return (
        <>
            <div className='flex'>
                <div className={`${open ? "w-full" : "w-20"} duration-300 p-5 pt-8 h-screen bg-[#001B48] relative`}>
                    <div
                        className={`h-[35px] w-[35px] bg-white rounded-full text-[20px] flex justify-center items-center border-2 border-[#001B48] absolute cursor-pointer -right-4 top-7 ${!open ? "rotate-180" : ""
                            }`}
                        onClick={() => setopen(!open)}
                    >
                        <IoIosArrowBack />
                    </div>
                    <div className='flex gap-x-4 items-center'>
                        <img src={logo} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
                        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>
                            Furr Delight
                        </h1>

                    </div>
                    <ul className='pt-6'>

                        {
                            menus.map((menu, index) => (
                                <>
                                    <Link to={menu.path}>
                                        <li
                                            key={index}
                                            className={`text-gray-300 text-md flex items-center gap-x-4 cursor-pointer p-2 rounded-md 
                                        ${menu.gap ? "mt-9" : "mt-2"} 
                                        ${location.pathname === menu.path ? "bg-[#DEF0FF] text-[#02457A]" : "hover:bg-[#02457A]"}`}

                                        >
                                            <span className={`${location.pathname === menu.path ? "bg-[#DEF0FF] text-[#02457A]" : ""}`}>
                                                {menu.image}
                                            </span>
                                            <span className={`${!open && "hidden"} origin-left duration-200 ${location.pathname === menu.path ? "bg-[#DEF0FF] text-[#02457A]" : ""}`}>{menu.title}</span>
                                        </li>
                                    </Link>
                                </>
                            ))
                        }

                    </ul>
                    <div
                        onClick={handleLogout}
                        className="text-gray-300 text-md flex items-center gap-x-4 cursor-pointer p-2 mt-6 rounded-md hover:bg-[#02457A] hover:text-white"
                    >
                        <span className="text-lg"><AiOutlineLogout /></span>
                        <span className={`${!open && "hidden"} origin-left duration-200`}>Logout</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
