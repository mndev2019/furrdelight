import React, { useEffect, useState, useTransition } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, Postwithformdata, putwithformdata } from '../../Api/Api';
import { baseUrl } from '../../Api/Baseurl';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';


const ShopCategory = () => {
    const token = localStorage.getItem("token")
    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [bgcolor, setbgcolor] = useState("");
    const [pet_category, setpet_category] = useState('');
    const [petcategorydata, setpetcategorydata] = useState([]);
    const [data, setData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [editid, seteditid] = useState("");
    const handlefile = (e) => {
        const selectedfile = e.target.files[0];
        setimage(selectedfile);
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!title || !image || !bgcolor || !pet_category) return;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('bg_color', bgcolor);
        formData.append('pet_category', pet_category);

        if (editid) {
            try {
                const response = await putwithformdata(`update_shop_category/${editid}`, formData, token);

                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === editid ? response.data : item
                    )
                );
                if (response && response.error == 0) {
                    toast.success("shop category update successfully!");
                    settitle('');
                    setbgcolor('');
                    setpet_category('');
                    setimage(null);
                    fetchshopbycategory();

                } else {
                    toast.error(response.message || "Failed to update shop category")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        } else {
            try {
                const response = await Postwithformdata('shop_by_category', formData, token);

                if (response && response.error == 0) {
                    // Only update the UI if the API succeeds
                    toast.success("shop category add successfully!");
                    setData((prevData) => [...prevData, response.data]);
                    settitle('');
                    setbgcolor('');
                    setpet_category('');
                    setimage(null);
                    fetchshopbycategory();
                } else {
                    toast.error(response.message || "Failed to add shop category")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        }

    };
    const fetchpetcategorydata = async () => {
        try {
            const response = await getwithheader('category');
            setpetcategorydata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    const fetchshopbycategory = async () => {
        try {
            const response = await getwithheader('shop_by_category');
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
            settitle(found.title);
            setimage(found.image);
            setbgcolor(found.bg_color);
            setpet_category(found.pet_category);
        } else {
            console.error('Item not found');
        }
    }

    useEffect(() => {
        startTransition(fetchshopbycategory);
        fetchpetcategorydata();
    }, []);
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            try {

                const response = await deleteapi(`delete_shop_category/${id}`);
                if (response && response.error === 0) {
                    toast.success(response.message);
                    fetchshopbycategory();
                } else {
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
                                <label className="block text-[#001B48] font-bold mb-2">Select Pet category</label>
                                <select
                                    value={pet_category}
                                    onChange={(e) => setpet_category(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="">Select a pet category</option>
                                    {petcategorydata.map((itm) => (
                                        <option value={itm._id} key={itm._id}>{itm.title}</option>
                                    ))}
                                </select>
                            </div>
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
                                <label className="block text-[#001B48] font-bold mb-2">Upload Image</label>
                                <input
                                    type="file"
                                    onChange={handlefile}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"

                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Background Color</label>
                                <input
                                    type="text"
                                    value={bgcolor}
                                    onChange={(e) => setbgcolor(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter background color"
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
                                    <th>Image</th>
                                    <th>
                                        Background color
                                    </th>
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
                                        <td>
                                            <div
                                                className="w-6 h-6 rounded "
                                                style={{ backgroundColor: item.bg_color }}
                                                title={item.bg_color}
                                            />
                                        </td>

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

export default ShopCategory
