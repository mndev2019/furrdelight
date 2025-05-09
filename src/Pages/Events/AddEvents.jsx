import React, { useEffect, useState, useTransition } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, Postwithformdata, putwithformdata } from '../../Api/Api';
import { baseUrl } from '../../Api/Baseurl';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';
import moment from 'moment';
const AddEvents = () => {
    const token = localStorage.getItem("token");
    const [title, settitle] = useState("");
    const [date, setdate] = useState("");
    const [image, setimage] = useState("");
    const [location, setlocation] = useState("");
    const [description, setdescription] = useState("");
    const [short_description, setshort_description] = useState("");
    const [price, setprice] = useState("");
    const [data, setData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [editid, seteditid] = useState("");
    const [editimage, seteditimage] = useState("");
    const handleimage = (e) => {
        e.preventDefault();
        const selectedFiles = e.target.files;
        const filesArray = Array.from(selectedFiles);
        setimage(filesArray);
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!title || !image || !location || !description || !short_description || !price || !date) return;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('short_description', short_description);
        formData.append('price', price);
        formData.append('date', date);
        // Append images to form data
        if (image && image.length > 0) {
            image.forEach((img) => {
                formData.append(`image`, img);
            });
        }
        if (editid) {
            try {
                const response = await putwithformdata(`update_events/${editid}`, formData, token);
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === editid ? response.data : item
                    )
                );
                if (response && response.error == 0) {
                    toast.success("events update successfully!");
                    settitle('');
                    setlocation('');
                    setdescription('');
                    setshort_description('');
                    setprice('');
                    setdate('');
                    setimage(null);

                } else {
                    toast.error(response.message || "Failed to update events.")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        } else {
            try {
                const response = await Postwithformdata('events', formData, token);
                if (response && response.error == 0) {
                    // Only update the UI if the API succeeds
                    toast.success("events add successfully!");
                    setData((prevData) => [...prevData, response.data]);
                    settitle('');
                    setlocation('');
                    setdescription('');
                    setshort_description('');
                    setprice('');
                    setdate('');
                    setimage(null);
                    fetchevents();
                } else {
                    toast.error(response.message || "Failed to add events.")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        }

    };

    const fetchevents = async () => {
        try {
            const response = await getwithheader('events');
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
            setlocation(found.location);
            setdescription(found.description);
            setshort_description(found.short_description);
            setprice(found.price);
            // setimage(found.image);
            seteditimage(found.image);
            if (found.date) {
                const formattedDate = moment(found.date).format("YYYY-MM-DD");
                setdate(formattedDate);
            } else {
                setdate("");
            }
        } else {
            console.error('Item not found');
        }
    }

    useEffect(() => {
        startTransition(fetchevents);

    }, []);
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            try {
                const response = await deleteapi(`delete_events/${id}`);
                if (response && response.error === 0) {
                    toast.success(response.message);
                    fetchevents();
                } else {
                    toast.error(response.message);
                    console.error("Error deleting:", response.message);
                    alert("Failed to delete. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };
    const handleRemoveimage = async (e, id) => {
        e.preventDefault()
        const res = await deleteapi(`delete-eventimage/${id}`, token)
        if (res.error == "0") {
            toast.success(res.message);
            seteditimage("")
        } else {
            toast.error("Image Not Deleted")
        }
    }

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
                                <label className="block text-[#001B48] font-bold mb-2">Upload Image</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => handleimage(e)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"

                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setdate(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter background color"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Location</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setlocation(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter detail"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter detail"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Short Description</label>
                                <input
                                    type="text"
                                    value={short_description}
                                    onChange={(e) => setshort_description(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter detail"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Price</label>
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setprice(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter detail"
                                    required
                                />
                            </div>
                            <div className="col-span-1 mt-6">
                                <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" disabled={isPending}>
                                    {editid ? "Update" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </form>
                    {
                        editid && editimage?.length > 0 &&
                        <div className="flex gap-3 mt-5 flex-wrap">
                            {editimage.map((imageObj, index) => (
                                <div key={index} className="relative w-[100px] h-[100px]">
                                    <img
                                        src={`${baseUrl}${imageObj.img}`}
                                        className="w-full h-full object-cover rounded"
                                        alt={`Product Image ${index + 1}`}
                                    />
                                    <button

                                        className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow-md"
                                        onClick={(e) => handleRemoveimage(e, imageObj._id)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    }
                    <div className="grid grid-cols-1 mt-3">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Short Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item) => (
                                    <tr className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{item?.title}</td>
                                        <td className="flex gap-2">
                                            {item?.image?.map((imgObj, index) => (
                                                <img
                                                    key={index}
                                                    src={`${baseUrl.replace(/\/$/, "")}/${imgObj.img.replace(/\\/g, "/")}`}
                                                    alt={item.title}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                            ))}
                                        </td>
                                        <td>
                                            {moment(item?.date).format("DD/MM/YYYY")}
                                        </td>
                                        <td>
                                            {item?.location}
                                        </td>
                                        <td>
                                            {item?.short_description}
                                        </td>
                                        <td>
                                            {item?.price}
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

export default AddEvents
