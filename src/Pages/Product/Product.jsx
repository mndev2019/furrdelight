import React, { useTransition } from 'react'
import Topnav from '../../Component/Topnav'
// import { deleteapiwithdata, getwithheader, Postwithformdata, putwithformdata } from '../../Api/Api';
// import { baseUrl } from '../../Api/Baseurl';
// import { FaEdit } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';
// import { toast } from 'react-toastify';


const Product = () => {
    // const token = localStorage.getItem("token")
    // const [petTypeId, setPetTypeId] = useState("");
    // const [name, setname] = useState("");
    // const [image, setimage] = useState("");
    // const [data, setData] = useState([]);
    // const [pettypedata, setpettypedata] = useState([]);
    const [isPending, startTransition] = useTransition();
    // const [editid, seteditid] = useState("");
    // const handlefile = (e) => {
    //     const selectedfile = e.target.files[0];
    //     setimage(selectedfile);
    // }
    // const handlesubmit = async (e) => {
    //     e.preventDefault();
    //     if (!name || !image) return;
    //     const formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('image', image);
    //     formData.append('pet_type', petTypeId);
    //     if (editid) {
    //         try {
    //             const response = await putwithformdata(`pet_breeds/${editid}`, formData, token);
    //             toast.success("pet breed update successfully!");
    //             setData((prevData) =>
    //                 prevData.map((item) =>
    //                     item._id === editid ? response.data : item
    //                 )
    //             );
    //             if (response && response.error == 0) {
    //                 setname('');
    //                 setimage(null);

    //             }
    //         } catch (error) {
    //             console.error('Error submitting:', error);
    //             alert("Failed to submit. Please try again.");
    //         }
    //     } else {
    //         try {
    //             const response = await Postwithformdata('pet_breeds', formData, token);
    //             toast.success("pet breed add successfully!");
    //             if (response && response.error == 0) {
    //                 // Only update the UI if the API succeeds
    //                 setData((prevData) => [...prevData, response.data]);
    //                 setname('');
    //                 setimage(null);
    //                 setPetTypeId('');
    //                 fetchpetbreed();
    //             }
    //         } catch (error) {
    //             console.error('Error submitting:', error);
    //             alert("Failed to submit. Please try again.");
    //         }
    //     }

    // };
    // const fetchpettype = async () => {
    //     try {
    //         const response = await getwithheader('pet_type', token);
    //         setpettypedata(response.data || []);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         toast.error(`${error.message}`);
    //     }
    // };
    // const fetchpetbreed = async () => {
    //     try {
    //         const response = await getwithheader('pet_breeds', token);
    //         setData(response.data || []);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         toast.error(`${error.message}`);
    //     }
    // };
    // const handledit = (id) => {
    //     seteditid(id);
    //     const found = data.find(item => item._id == id);
    //     if (found) {
    //         setname(found.name);
    //         setimage(found.image);
    //         setPetTypeId(found.pet_type?._id);

    //     } else {
    //         console.error('Item not found');
    //     }
    // }

    // useEffect(() => {
    //     startTransition(fetchpetbreed);
    //     fetchpettype();
    // }, []);
    // const handleDelete = async (id) => {
    //     if (confirm('Are you sure you want to delete?')) {
    //         try {
    //             const response = await deleteapiwithdata(`pet_breeds/${id}`, {}, token);
    //             if (response && response.error === 0) {
    //                 toast.success(response.message);
    //                 fetchpetbreed();
    //             } else {
    //                 console.error("Error deleting:", response.message);
    //                 alert("Failed to delete. Please try again.");
    //             }
    //         } catch (error) {
    //             console.error("Error deleting:", error);
    //         }
    //     }
    // };

    return (
        <>
            {isPending && <Loader />}
            <Topnav />
            <section>
                <div className="container">
                    <form >
                        <div className="grid grid-cols-4 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Upload Image</label>
                                <input
                                    type="file"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"

                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Price</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter price"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Discount Price</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter discount price"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Stock</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter stock"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Sku</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter sku"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Short Description</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter short description"
                                    required
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-[#001B48] font-bold mb-2">Description</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Unit</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter unit"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Category</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter category"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Brand</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter brand"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Weight</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter weight"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Color Variants</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter color variants"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">size Variants</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter size variants"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Materials</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter materials"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Warranty</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter warranty"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Return pilicy</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter return policy"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Sell</label>
                                <input
                                    type="text"

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter sell"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Select Stock Status</label>
                                <select

                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="">In Stock</option>
                                    <option value="">Out of Stock</option>
                                    <option value="">Pre Order</option>

                                </select>
                            </div>


                            <div className="col-span-1 mt-6">
                                <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" disabled={isPending}>
                                    {isPending ? 'Processing...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* <div className="grid grid-cols-1 mt-3">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                                    <th>Name</th>
                                    <th>Image</th>
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
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default Product

