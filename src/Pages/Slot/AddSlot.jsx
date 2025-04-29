import React, { useEffect, useState, useTransition } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, postwithheader, putwithheader } from '../../Api/Api';

import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';



const AddSlot = () => {
    const token = localStorage.getItem("token")
    // const navigate = useNavigate();
    const [slot, setslot] = useState("");
    const [start_time, setstart_time] = useState("");
    const [end_time, setend_time] = useState("");



    const [data, setData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [editid, seteditid] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();

        const requestdata = {
            slot,
            start_time,
            end_time
        }

        if (editid) {
            try {
                const response = await putwithheader(`slots/${editid}`, requestdata, token);
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === editid ? response.data : item
                    )
                );
                if (response && response.error == 0) {
                    toast.success("Slot update successfully!");
                    handleClear()
                } else {
                    toast.error(response.message || "Failed to update Slot ")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        } else {
            try {
                const response = await postwithheader('slots', requestdata, token);
                if (response && response.error == 0) {
                    // Only update the UI if the API succeeds
                    toast.success("Slot add successfully!");

                    // setData((prevData) => [...prevData, response.data]);
                    handleClear()
                    fetchpetype();
                } else {
                    toast.error(response.message || "Failed to add Slot ")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        }
    };

    const handleClear = () => {
        setslot("")
        seteditid("")
        setstart_time("")
        setend_time("")
    }
    const fetchpetype = async () => {
        try {
            const response = await getwithheader('slots', token);
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
            setslot(found.slot);
            setstart_time(found.start_time);
            setend_time(found.end_time);
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

                const response = await deleteapi(`slots/${id}`);
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
                                <label className="block text-[#001B48] font-bold mb-2">Slot</label>

                                <select name="" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" id="" value={slot}
                                    onChange={(e) => setslot(e.target.value)}>
                                    <option value="">Select Slot</option>
                                    <option value="morning">Morning</option>
                                    <option value="afternoon">Afternoon</option>
                                    <option value="evening">evening</option>



                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Start Time <span className='text-red-500 text-sm'>(enter time like 11:00)</span></label>
                                <input
                                    type="text"
                                    value={start_time}
                                    onChange={(e) => setstart_time(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter Start Time"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">End Time <span className='text-red-500 text-sm'>(enter time like 12:00)</span></label>
                                <input
                                    type="text"
                                    value={end_time}
                                    onChange={(e) => setend_time(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter End Time"
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
                                    <th>Slot</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>

                                    <th>Action</th>
                                    {/* <th>Breed</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{item?.slot}</td>
                                        <td>{item?.start_time}</td>
                                        <td>{item?.end_time}</td>
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
                                        {/* <td>
                                            <button onClick={() => navigate('/pet-breed')} type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]">
                                                Breed
                                            </button>
                                        </td> */}
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

export default AddSlot
