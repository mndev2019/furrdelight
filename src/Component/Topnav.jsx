import React from 'react'
import happy from '../assets/Image/happy.png'


const Topnav = () => {
    return (
        <>
            <nav className="w-full topbarNav bg-nav   bg-white  border-b-1 pb-2 shadow border-[#CBD5E1]">
                <div className="container mx-auto">
                    <div className="flex w-full navcontent  justify-between items-center">
                        <div className="px-5">

                            <div className="">
                                <p className="text-[#A6A6A6] text-[12px]">Hello</p>
                                <h4 className="text-[16px] font-[600]">Welcome Back!</h4>
                            </div>
                        </div>
                        <div className="px-5">
                            <div className="bg-white shadow p-1 rounded-full">
                                <img src={happy} style={{ height: "50px", width: "50px" }} alt="" />
                            </div>
                        </div>

                    </div>

                </div>
            </nav>
        </>
    )
}

export default Topnav
