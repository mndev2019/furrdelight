import React, { useEffect, useState } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, putWithJson } from '../../Api/Api';

import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';
import { FaEdit, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import SwitchToggle from '../../Component/SwitchToggle';
const UserManagement = () => {
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const fetchuser = async () => {
        try {
            const response = await getwithheader('users');
            setdata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    useEffect(() => {
        fetchuser();
    }, []);
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            try {
                const response = await deleteapi(`delete_user/${id}`);
                if (response && response.error === 0) {
                    toast.success(response.message);
                    fetchuser();
                } else {
                    console.error("Error deleting:", response.message);
                    alert("Failed to delete. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };
    const updateVerification = async (status, id) => {
        const requestdata = {
            verification: !status
        }
        try {
            const response = await putWithJson(`user_update/${id}`, requestdata);
            if (response && response.error === 0) {
                toast.success(response.message);
                fetchuser();
            } else {
                console.error("Error deleting:", response.message);
                alert("Failed to delete. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting:", error);
        }
    }

    return (
        <>
            <Topnav />
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 mt-3">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                                    <th>Name</th>
                                    <th> Email</th>
                                    <th>Mobile</th>
                                    <th>Verification</th>
                                    <th>View Detail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r  *:border-gray-100">
                                        <td>{item.username}</td>
                                        <td>
                                            {item.email}
                                        </td>
                                        <td>
                                            {item.phone}
                                        </td>
                                        <td>
                                            <SwitchToggle check={item?.verification} onClick={() => updateVerification(item.verification, item._id)} />
                                        </td>
                                        <td>
                                            <button
                                                className="p-2 rounded-sm shadow text-[23px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                onClick={() => navigate(`/add-defaultpermission/${item._id}`, { state: item })}

                                            >
                                                <FaEye />
                                            </button>
                                        </td>
                                        <td>
                                            <div className="flex gap-3 item-center">
                                                <button className="p-2 rounded-sm shadow text-[20px] text-[#001B48] hover:bg-[#001B48] hover:text-white" onClick={() => navigate('/add-product', { state: { ...item } })}>
                                                    {/* onClick={() => handledit(item._id)} */}
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="p-2 rounded-sm shadow text-[23px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                    onClick={() => handleDelete(item._id)}
                                                >

                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
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

export default UserManagement

