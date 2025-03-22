'use client';

import React, { useEffect, useState, useTransition } from 'react';
import Topnav from '../../Component/Topnav';
import { deleteapi, getWithoutHeader, Postwithformdata } from '../../Api/Api';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { baseUrl } from '../../Api/Baseurl';
import Loader from '../../Component/Loader';

const Banner = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [data, setData] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !image) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);

        try {
            const response = await Postwithformdata('create_banner', formData);

            if (response && response.error == 0) {
                // Only update the UI if the API succeeds
                setData((prevData) => [...prevData, response.data]);
                setTitle('');
                setImage(null);
            }
        } catch (error) {
            console.error('Error submitting:', error);
            alert("Failed to submit. Please try again.");
        }
    };


    const fetchBanners = async () => {
        try {
            const response = await getWithoutHeader('banner');
            setData(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        startTransition(fetchBanners);
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteapi(`banner_delete/${id}`);
            setData((prevData) => prevData.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    return (
        <>
            {isPending && <Loader />}
            <Topnav />
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Upload Image</label>
                                <input
                                    type="file"
                                    onChange={handleFile}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
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
                                    <th>Title</th>
                                    <th>Image</th>
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
                                            <div className="flex gap-3 item-center">
                                                <button className="p-2 rounded-sm shadow text-[20px] text-[#001B48] hover:bg-[#001B48] hover:text-white">
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
    );
};

export default Banner;
