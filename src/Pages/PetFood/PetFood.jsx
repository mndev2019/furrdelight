import React, { useEffect, useState, useTransition } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, Postwithformdata, putwithformdata } from '../../Api/Api';
import { baseUrl } from '../../Api/Baseurl';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';


const PetFood = () => {
    const token = localStorage.getItem("token");
    const [name, setname] = useState("");
    const [image, setimage] = useState("");
    const [bgcolor, setbgcolor] = useState("");
    const [detail, setdetail] = useState("");
    const [pet_type, setpet_type] = useState('');
    const [petfood_type, setpetfood_type] = useState('');

    const [pettypedata, setpettypedata] = useState([]);
    const [petfoodtypedata, setpetfoodtypedata] = useState([]);

    const [data, setData] = useState([]);
    const [isPending, startTransition] = useTransition();
    const [editid, seteditid] = useState("");
    const handlefile = (e) => {
        const selectedfile = e.target.files[0];
        setimage(selectedfile);
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!name || !image || !bgcolor) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('bg_color', bgcolor);
        formData.append('detail', detail);
        formData.append('pet_type', pet_type);
        formData.append('pet_food_type', petfood_type);


        if (editid) {
            try {
                const response = await putwithformdata(`update_petfood/${editid}`, formData, token);
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === editid ? response.data : item
                    )
                );
                if (response && response.error == 0) {
                    toast.success("pet category update successfully!");
                    setname('');
                    setbgcolor('');
                    setdetail('');
                    setpet_type('');
                    setimage(null);
                    fetchcategory();
                } else {
                    toast.error(response.message || "Failed to update pet category")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        } else {
            try {
                const response = await Postwithformdata('pet_food', formData, token);

                if (response && response.error == 0) {
                    // Only update the UI if the API succeeds
                    toast.success("pet food add successfully!");
                    setData((prevData) => [...prevData, response.data]);
                    setname('');
                    setbgcolor('');
                    setdetail('');
                    setpet_type('');
                    setimage(null);
                    fetchcategory();
                } else {
                    toast.error(response.message || "Failed to add pet category")
                }
            } catch (error) {
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        }

    };
    const fetchpetfoodtypedata = async () => {
        try {
            const response = await getwithheader('petfood_type', token);
            setpetfoodtypedata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    const fetchpettypedata = async () => {
        try {
            const response = await getwithheader('pet_type', token);
            setpettypedata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    const fetchcategory = async () => {
        try {
            const response = await getwithheader('pet_food', token);
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
            setimage(found.image);
            setbgcolor(found.bg_color);
            setpet_type(found.pet_type);
            setdetail(found.detail);

        } else {
            console.error('Item not found');
        }
    }

    useEffect(() => {
        startTransition(fetchcategory);
        fetchpettypedata();
        fetchpetfoodtypedata()

    }, []);
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            try {

                const response = await deleteapi(`petfood_delete/${id}`);
                if (response && response.error === 0) {
                    toast.success(response.message);
                    fetchcategory();
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

    return (
        <>
            {isPending && <Loader />}
            <Topnav />
            <section>
                <div className="container">
                    <form onSubmit={handlesubmit}>
                        <div className="grid grid-cols-4 mt-3 gap-3 items-center">

                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Select Pet  Type</label>
                                <select
                                    value={pet_type}
                                    onChange={(e) => setpet_type(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="">Select a pet type</option>
                                    {pettypedata.map((itm) => (
                                        <option value={itm._id} key={itm._id}>{itm.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Select Pet Food Type</label>
                                <select
                                    value={petfood_type}
                                    onChange={(e) => setpetfood_type(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="">Select a pet type</option>
                                    {petfoodtypedata.map((itm) => (
                                        <option value={itm._id} key={itm._id}>{itm.name}</option>
                                    ))}
                                </select>
                            </div>
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
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Detail</label>
                                <input
                                    type="text"
                                    value={detail}
                                    onChange={(e) => setdetail(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter detail"
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
                                    <th>Background color</th>
                                    <th>Pet Type</th>
                                    <th>Pet Food Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{item.name}</td>
                                        <td>
                                            <img src={`${baseUrl}${item.image}`} alt={item.title} className="h-10 w-10 rounded-full" />
                                        </td>
                                        <td>
                                            {/* <input type="color" value={item.bg_color} /> */}
                                            <div
                                                className="w-6 h-6 rounded "
                                                style={{ backgroundColor: item.bg_color }}
                                                title={item.bg_color} // optional: shows hex on hover
                                            ></div>
                                        </td>
                                        <td>{item?.pet_type?.name}</td>
                                        <td>{item?.pet_food_type?.name}</td>


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

export default PetFood
