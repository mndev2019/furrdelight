import React, { useEffect, useState, useTransition } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, Postwithformdata, putwithformdata } from '../../Api/Api';
import { baseUrl } from '../../Api/Baseurl';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';


const Splash = () => {
    const [title, settitle] = useState("");
    const [position, setposition] = useState("");
    const [image, setimage] = useState("");
    const [data, setData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [editid, seteditid] = useState("");
    const handlefile = (e) => {
        const selectedfile = e.target.files[0];
        setimage(selectedfile);
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!title || !image || !position) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('position', position)
        if (editid) {
            try {
                const response = await putwithformdata(`splash/${editid}`, formData);
                if (response && response.error == 0) {
                    // Only update the UI if the API succeeds
                    toast.success("splash update successfully!");
                    setData((prevData) =>
                        prevData.map((item) =>
                            item._id === editid ? { ...item, ...response.data } : item
                        )
                    );
                    settitle('');
                    setposition('');
                    setimage(null);
                } else {
                    toast.error(response.message)
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        } else {
            try {
                const response = await Postwithformdata('splash', formData);
                if (response && response.error == 0) {
                    // Only update the UI if the API succeeds
                    toast.success("splash add successfully!");
                    setData((prevData) => [...prevData, response.data]);
                    settitle('');
                    setposition('');
                    setimage(null);
                } else {
                    toast.error(response.message)
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        }


    };
    const fetchSplash = async () => {
        try {
            const response = await getwithheader('splash');
            setData(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };

    useEffect(() => {
        startTransition(fetchSplash);
    }, []);
    const handledit = (id) => {
        seteditid(id);
        const found = data.find(item => item._id == id);
        if (found) {
            settitle(found.title);
            setposition(found.position);
            setimage(found.image);
        } else {
            console.error("Item not found");
        }
    }
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            try {
                const response = await deleteapi(`delete_splash/${id}`);
                if (response && response.error === 0) {
                    console.log("Deleted successfully", response);
                    fetchSplash();
                } else {
                    toast.error(response.message)
                    console.error("Error deleting:", response.message);
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
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Position</label>
                                <input
                                    type="text"
                                    value={position}
                                    onChange={(e) => setposition(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter position"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Upload Image</label>
                                <input
                                    type="file"
                                    onChange={handlefile}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"

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
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Position</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{item.title}</td>
                                        <td>
                                            <img src={`${baseUrl}${item.image}`} alt={item.title} className="h-10 w-10 rounded-full" />
                                        </td>
                                        <td>{item.position}</td>
                                        <td>
                                            <div className="flex gap-3 item-center">
                                                <button className="p-2 rounded-sm shadow text-[20px] text-[#001B48] hover:bg-[#001B48] hover:text-white">
                                                    <FaEdit onClick={() => handledit(item._id)} />
                                                </button>
                                                <button
                                                    className="p-2 rounded-sm shadow text-[23px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                    onclick={() => handleDelete(item._id)}
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

export default Splash
