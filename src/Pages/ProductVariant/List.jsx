import React, { useEffect, useState } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader } from '../../Api/Api';

import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';
import { baseUrl } from '../../Api/Baseurl';
import { FaEdit, FaEye, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
const ProductVariantlist = () => {

    const navigate = useNavigate();

    const [data, setdata] = useState([]);
    const fetchevents = async () => {
        try {
            const response = await getwithheader('product_variant');
            setdata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    useEffect(() => {
        fetchevents();
    }, []);
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            try {
                const response = await deleteapi(`delete_product_variant/${id}`);
                if (response && response.error === 0) {
                    toast.success(response.message);
                    fetchevents();
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
            <Topnav />
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 mt-3">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                                    <th>Name</th>
                                    <th>
                                        Image
                                    </th>
                                    <th>Stock</th>
                                    <th>Unit </th>
                                    <th>Price</th>
                                    <th>Add Product Variant</th>
                                    <th>View Detail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r  *:border-gray-100">
                                        <td>{item?.name}</td>
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
                                            {item?.stock}
                                        </td>
                                        <td>
                                            {item?.unit_value} {item?.unit?.title}
                                        </td>
                                        <td>{item?.price}</td>
                                        <td>
                                            <button
                                                className="p-2 rounded-sm shadow text-[23px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                onClick={() => navigate(`/addproduct-variant/${item?._id}`)}
                                            >
                                                <FaPlus />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="p-2 rounded-sm shadow text-[23px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                onClick={() => navigate(`/product-detail/${item._id}`)}
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

export default ProductVariantlist

