import React, { useEffect, useState, useTransition } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, Postwithformdata, postwithheader, putwithformdata } from '../../Api/Api';

import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';



const PetFoodType = () => {
    const token = localStorage.getItem("token")

    const [name, setname] = useState("");

    const [data, setData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [editid, seteditid] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Name is not fill")
            return;
        }

        let requestdata = {
            name
        }


        if (editid) {
            try {
                const response = await putwithformdata(`petfood_type_update/${editid}`, requestdata, token);
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === editid ? response.data : item
                    )
                );
                if (response && response.error == 0) {
                    toast.success("pet type update successfully!");
                    setname('');


                } else {
                    toast.error(response.message || "Failed to update pet type ")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        } else {
            try {
                const response = await postwithheader('petfood_type', requestdata, token);
                if (response && response.error == 0) {
                    // Only update the UI if the API succeeds
                    toast.success("pet type add successfully!");
                    setData((prevData) => [...prevData, response.data]);
                    setname('');

                    fetchpetype();
                } else {
                    toast.error(response.message || "Failed to add pet type ")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        }

    };
    const fetchpetype = async () => {
        try {
            const response = await getwithheader('petfood_type');
            setData(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    const handledit = (id) => {
        seteditid(id);
        const found = data.find(item => item._id == id);


        if (found) {
            setname(found.name);
        } else {
            console.error('Item not found');
        }
    }

    useEffect(() => {
        startTransition(fetchpetype);
    }, []);
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            try {

                const response = await deleteapi(`petfood_type_delete/${id}`);
                if (response && response.error === 0) {
                    toast.success(response.message);
                    fetchpetype();
                } else {
                    console.error("Error deleting:", response.message);
                    toast.error(response.message)
                    alert("Failed to delete. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };

    return (
        <>
            {isPending && <Loader />}
            <Topnav />
            <section>
                <div className="container">
                    <form onSubmit={handlesubmit}>
                        <div className="grid grid-cols-4 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>

                            <div className="col-span-1 mt-6">
                                <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" disabled={isPending}>
                                    {isPending ? 'Processing...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="grid grid-cols-1 mt-3">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                                    <th>Name</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{item.name}</td>
                                        <td>
                                            <div className="flex gap-3 item-center">
                                                <button className="p-2 rounded-sm shadow text-[20px] text-[#001B48] hover:bg-[#001B48] hover:text-white" onClick={() => handledit(item._id)}>
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

export default PetFoodType
