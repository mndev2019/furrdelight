import React, { useEffect, useState } from 'react'
import Topnav from '../../Component/Topnav'
import { getwithheader } from '../../Api/Api';


import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';


const Profile = () => {
    const token = localStorage.getItem("token")
    const [data, setData] = useState([])

    const fetchprofile = async () => {
        try {
            const response = await getwithheader('profile', token);
            setData([response.data]);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };


    useEffect(() => {
        fetchprofile();
    }, []);


    return (
        <>
            {/* {isPending && <Loader />} */}
            <Topnav />
            <section>
                <div className="container">

                    <div className="grid grid-cols-1 mt-3">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.password}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile
