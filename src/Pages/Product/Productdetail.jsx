import React, { useEffect, useState } from 'react'
import Topnav from '../../Component/Topnav'
import { getwithheader } from '../../Api/Api';
import { toast } from 'react-toastify';
import { baseUrl } from '../../Api/Baseurl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';

const Productdetail = () => {
    const {id} = useParams();
    const token = localStorage.getItem("token");
    const [data, setdata] = useState([]);

    const fetchevents = async () => {
        try {
            const response = await getwithheader(`product/${id}`, token);
            setdata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };

    useEffect(() => {
        fetchevents();
    }, []);

    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Topnav />
            <section className="pt-4 ">
                {data.map((product) => (
                    <div
                        key={product._id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6  bg-white rounded-xl shadow-lg p-6 mb-10"
                    >
                        {/* Image Slider */}
                        <div className="md:col-span-5">
                            <Slider {...settings}>
                                {product.image?.map((imgObj, index) => (
                                    <div key={index}>
                                        <img
                                            src={`${baseUrl.replace(/\/$/, "")}/${imgObj.img.replace(/\\/g, "/")}`}
                                            alt={product.title}
                                            className="h-64 object-contain mx-auto rounded-lg"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {/* Product Info */}
                        <div className="md:col-span-7 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
                                <p className="text-gray-600 mb-2">{product.short_description}</p>
                                <p className="text-sm text-gray-500 mb-4">{product.description}</p>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <p><span className="font-semibold">SKU:</span> {product.sku}</p>
                                    <p><span className="font-semibold">Weight:</span> {product.weight} kg</p>
                                    <p><span className="font-semibold">Quantity:</span> {product.quantity}</p>
                                    <p>
                                        <span className="font-semibold">Stock Status:</span>
                                        <span className={`ml-1 font-medium ${product.stock_status === 'in_stock' ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.stock_status}
                                        </span>
                                    </p>
                                    <p><span className="font-semibold">Rating:</span> ⭐ {product.rating}</p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="">
                                <p className="text-lg font-bold text-gray-800">
                                    Price: <span className="line-through text-red-500 mr-2">₹{product.price}</span>
                                    <span className="text-green-600">₹{product.discount_price}</span>
                                </p>
                            </div>
                        </div>

                        {/* Brand & Category Section */}
                        <div className="col-span-12 flex flex-col md:flex-row gap-6 mt-6">
                            {/* Brand */}
                            {product.brand && (
                                <div className="flex items-center gap-4 p-4 bg-[#DEF0FF]  rounded-xl shadow-sm hover:shadow-md transition duration-300 w-full md:w-1/2">
                                    <img
                                        src={`${baseUrl.replace(/\/$/, "")}/${product.brand.image.replace(/\\/g, "/")}`}
                                        alt={product.brand.title}
                                        className="w-16 h-16 object-contain rounded-md"
                                    />
                                    <div>
                                        <p className="text-md font-semibold text-gray-800">Brand</p>
                                        <p className="text-sm text-gray-600">{product.brand.title}</p>
                                    </div>
                                </div>
                            )}

                            {/* Category */}
                            {product.shop_by_category && (
                                <div className="flex items-center gap-4 p-4 bg-[#DEF0FF] rounded-xl shadow-sm hover:shadow-md transition duration-300 w-full md:w-1/2">
                                    <img
                                        src={`${baseUrl.replace(/\/$/, "")}/${product.shop_by_category.image.replace(/\\/g, "/")}`}
                                        alt={product.shop_by_category.title}
                                        className="w-16 h-16 object-contain rounded-md"
                                    />
                                    <div>
                                        <p className="text-md font-semibold text-gray-800">Category</p>
                                        <p className="text-sm text-gray-600">{product.shop_by_category.title}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default Productdetail;
