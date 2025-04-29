import React, { useEffect, useState } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, Postwithformdata, putwithformdata } from '../../Api/Api';
// import Loader from '../../Component/Loader';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Api/Baseurl';
const Product = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [branddata, setbranddata] = useState([]);
    const [shopcategorydata, setshopcategorydata] = useState([]);
    const [unitdata, setunitdata] = useState([]);
    const [title, settitle] = useState("");
    const [price, setprice] = useState("");
    const [discount_price, setdiscount_price] = useState("");
    const [rating, setrating] = useState("");
    const [quantity, setquantity] = useState("");
    const [stock, setstock] = useState("");
    const [stock_status, setstock_status] = useState("");
    const [sku, setsku] = useState("");
    const [description, setdescription] = useState("");
    const [short_description, setshort_description] = useState("");
    const [unit, setunit] = useState("");
    const [shop_by_category, setshop_by_category] = useState("");
    const [brand, setbrand] = useState("");
    const [weight, setweight] = useState("");
    const [image, setimage] = useState("");
    const [editimage, seteditimage] = useState("");
    const [editid, seteditid] = useState("");

    const handleimage = (e) => {
        e.preventDefault();
        const selectedFiles = e.target.files;
        const filesArray = Array.from(selectedFiles);
        setimage(filesArray);
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('discount_price', discount_price);
        formData.append('rating', rating);
        formData.append('quantity', quantity);
        formData.append('stock', stock);
        formData.append('stock_status', stock_status);
        formData.append('sku', sku);
        formData.append('description', description);
        formData.append('short_description', short_description);
        formData.append('unit', unit);
        formData.append('shop_by_category', shop_by_category);
        formData.append('brand', brand);
        formData.append('weight', weight);
        if (image && image.length > 0) {
            image.forEach((img) => {
                formData.append(`image`, img);
            });
        } if (editid) {
            try {
                const res = await putwithformdata(`update_product/${editid}`, formData, token);
                if (res.status === "OK" && res.error === 0) {
                    toast.success("Product update successfully!");
                    navigate('/product-list');
                } else {
                    toast.error(res.message || "Failed to add product.");
                }

            } catch (error) {
                const errorMsg = error?.response?.data?.message || "Something went wrong";
                toast.error(errorMsg);
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        } else {
            try {
                const res = await Postwithformdata('product', formData, token);
                if (res.status === "OK" && res.error === 0) {
                    toast.success("Product added successfully!");
                    navigate('/product-list');
                } else {
                    toast.error(res.message || "Failed to add product.");
                }

            } catch (error) {
                const errorMsg = error?.response?.data?.message || "Something went wrong";
                toast.error(errorMsg);
                console.error('Error submitting:', error);
                alert("Failed to submit. Please try again.");
            }
        }

    };
    useEffect(() => {
        if (state && state._id) {
            handleEdit();
        }
    }, [state]);
    const handleEdit = () => {
        settitle(state.title);
        setprice(state.price);
        setdiscount_price(state.discount_price);
        setrating(state.rating);
        setquantity(state.quantity);
        setstock(state.stock);
        setstock_status(state.stock_status);
        setsku(state.sku);
        setdescription(state.description);
        setshort_description(state.short_description);
        setunit(state.unit._id);
        setshop_by_category(state.shop_by_category._id);
        setbrand(state.brand._id);
        setweight(state.weight);
        if (state) {
            seteditimage(state.image);

        }

        seteditid(state._id);
    };

    const fetchbrand = async () => {
        try {
            const response = await getwithheader('brand', token);
            setbranddata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    const fetchshopcategory = async () => {
        try {
            const response = await getwithheader('shop_by_category', token);
            setshopcategorydata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    const fetchunit = async () => {
        try {
            const response = await getwithheader('unit', token);
            setunitdata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };
    useEffect(() => {
        fetchbrand();
        fetchshopcategory();
        fetchshopcategory();
        fetchunit();
    }, []);
    const handleRemoveimage = async (e, id) => {
        e.preventDefault()
        const res = await deleteapi(`delete-image/${id}`, token)
        if (res.error == "0") {
            toast.success(res.message);
            seteditimage("")

            // window.location.reload();


        } else {
            toast.error("Image Not Deleted")
        }
    }
    return (
        <>
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
                                <label className="block text-[#001B48] font-bold mb-2">Price</label>
                                <input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setprice(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter price"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Rating</label>
                                <input
                                    type="text"
                                    value={rating}
                                    onChange={(e) => setrating(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter discount price"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Quantity</label>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => setquantity(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter discount price"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Discount Price</label>
                                <input
                                    type="text"
                                    value={discount_price}
                                    onChange={(e) => setdiscount_price(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter discount price"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Stock</label>
                                <input
                                    type="text"
                                    value={stock}
                                    onChange={(e) => setstock(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter stock"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Stock Status</label>
                                <select
                                    value={stock_status}
                                    onChange={(e) => setstock_status(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="">select stock status</option>
                                    <option value="in_stock">In stock</option>
                                    <option value="out_of_stock">Out of stock</option>
                                    <option value="pre_order">Pre order</option>
                                </select>
                            </div>

                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Sku</label>
                                <input
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setsku(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter sku"
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
                                    placeholder="Enter short description"
                                    required
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-[#001B48] font-bold mb-2">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter description"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Unit</label>
                                <select
                                    value={unit}
                                    onChange={(e) => setunit(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"

                                >
                                    <option value="">Select unit</option>
                                    {unitdata?.map((itm) => (
                                        <option value={itm._id} key={itm._id}>{itm.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Brand</label>
                                <select
                                    value={brand}
                                    onChange={(e) => setbrand(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="">Select a brand</option>
                                    {branddata?.map((itm) => (
                                        <option value={itm._id} key={itm._id}>{itm.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Shop by Category</label>
                                <select
                                    value={shop_by_category}
                                    onChange={(e) => setshop_by_category(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"

                                >
                                    <option value="">Select a shop category</option>
                                    {shopcategorydata?.map((itm) => (
                                        <option value={itm._id} key={itm._id}>{itm.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Weight</label>
                                <input
                                    type="text"
                                    value={weight}
                                    onChange={(e) => setweight(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter weight"
                                    required
                                />
                            </div>
                            <div className="col-span-1 mt-6">
                                <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" onClick={() => console.log("hello")}>
                                    {editid ? "Update" : " Submit"}
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

                </div>
            </section>
        </>
    )
}

export default Product

