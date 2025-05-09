import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { deleteapi, getwithheader, Postwithformdata, putwithformdata } from '../../Api/Api'
import { toast } from 'react-toastify'
import { baseUrl } from '../../Api/Baseurl'
import Topnav from '../../Component/Topnav'

function ProductVariant() {
    const { id } = useParams()
    const token = localStorage.getItem('token')
    const { state } = useLocation()
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [image, setimage] = useState("");
    const [editimage, seteditimage] = useState("");
    const [unitdata, setunitdata] = useState([]);
    const [price, setprice] = useState(0)
    const [mrp, setmrp] = useState(0)
    const [size, setsize] = useState("")
    const [color, setcolor] = useState("")
    const [material, setmaterial] = useState("")
    const [stock, setstock] = useState("")
    const [warranty, setwarranty] = useState("")
    const [unit, setunit] = useState("")
    const [unit_value, setunit_value] = useState("")
    const [sku, setsku] = useState("")
    const [editid, seteditid] = useState("");


    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('product', id);
        formData.append('price', price);
        formData.append('mrp', mrp);
        formData.append('size', size);
        formData.append('color', color);
        formData.append('material', material);
        formData.append('warranty', warranty);
        formData.append('unit_value', unit_value);

        // formData.append('quantity', quantity);
        formData.append('stock', stock);

        formData.append('sku', sku);


        formData.append('unit', unit);


        if (image && image.length > 0) {
            image.forEach((img) => {
                formData.append(`image`, img);
            });
        } if (editid) {
            try {
                const res = await putwithformdata(`update_product_variant/${editid}`, formData, token);
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
                const res = await Postwithformdata('product_variant', formData, token);
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


    const handleimage = (e) => {
        e.preventDefault();
        const selectedFiles = e.target.files;
        const filesArray = Array.from(selectedFiles);
        setimage(filesArray);
    };



    const fetchunit = async () => {
        try {
            const response = await getwithheader('unit');
            setunitdata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };


    useEffect(() => {
        if (state && state._id) {
            handleEdit();
        }
    }, [state]);
    const handleEdit = () => {
        setname(state.name);
        setprice(state.price);
        setmrp(state.mrp);

        // setquantity(state.quantity);
        setstock(state.stock);

        setsku(state.sku);

        setunit(state.unit._id);


        if (state) {
            seteditimage(state.image);

        }

        seteditid(state._id);
    };

    const handleRemoveimage = async (e, id) => {
        e.preventDefault()
        const res = await deleteapi(`delete-variantimage/${id}`, token)
        if (res.error == "0") {
            toast.success(res.message);
            seteditimage("")

            // window.location.reload();


        } else {
            toast.error("Image Not Deleted")
        }
    }

    useEffect(() => {
        fetchunit()
    }, [])

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
                                    multiple
                                    onChange={(e) => handleimage(e)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"

                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">MRP</label>
                                <input
                                    type="text"
                                    value={mrp}
                                    onChange={(e) => setmrp(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter discount price"
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
                                    placeholder="Enter price"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Size</label>
                                <input
                                    type="text"
                                    value={size}
                                    onChange={(e) => setsize(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter price"

                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Material</label>
                                <input
                                    type="text"
                                    value={material}
                                    onChange={(e) => setmaterial(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter weight"

                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Warranty</label>
                                <input
                                    type="text"
                                    value={warranty}
                                    onChange={(e) => setwarranty(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter weight"

                                />
                            </div>


                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Color</label>
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => setcolor(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter price"

                                />
                            </div>


                            {/* <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Quantity</label>
                                <input
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => setquantity(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter discount price"
                                    required
                                />
                            </div> */}

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
                                <label className="block text-[#001B48] font-bold mb-2">Unit Value</label>
                                <input
                                    type="text"
                                    value={unit_value}
                                    onChange={(e) => setunit_value(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter weight"
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

export default ProductVariant
