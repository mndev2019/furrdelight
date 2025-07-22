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
    const { id } = useParams();
    const [data, setdata] = useState([]);
    const fetchevents = async () => {
        try {
            const response = await getwithheader(`product/${id}`);
            setdata(response?.data || []);

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
            <section className="pt-4">
                <div
                    key={data?._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6  bg-white rounded-xl shadow-lg p-6 mb-10"
                >
                    {/* Image Slider */}
                    <div className="md:col-span-5">
                        <Slider {...settings}>
                            {data?.image?.map((imgObj, index) => (
                                <div key={index}>
                                    <img
                                        src={`${baseUrl.replace(/\/$/, "")}/${imgObj.img.replace(/\\/g, "/")}`}
                                        alt={data?.title}
                                        className="h-64 object-contain mx-auto rounded-lg"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* Product Info */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{data?.title}</h2>
                            <p className="text-gray-600 mb-2">{data?.short_description}</p>
                            <p className="text-sm text-gray-500 mb-4">{data?.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <p><span className="font-semibold">SKU:</span> {data?.sku}</p>
                                <p><span className="font-semibold">Weight:</span> {data?.weight} kg</p>
                                <p><span className="font-semibold">Quantity:</span> {data?.quantity}</p>
                                <p>
                                    <span className="font-semibold">Stock Status:</span>
                                    <span className={`ml-1 font-medium ${data?.stock_status === 'in_stock' ? 'text-green-600' : 'text-red-600'}`}>
                                        {data?.stock_status}
                                    </span>
                                </p>
                                <p><span className="font-semibold">Rating:</span> ⭐ {data?.rating}</p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="">
                            <p className="text-lg font-bold text-gray-800">
                                Price: <span className="line-through text-red-500 mr-2">₹{data?.price}</span>
                                <span className="text-green-600">₹{data?.discount_price}</span>
                            </p>
                        </div>
                    </div>

                 
                 
                    <div className="col-span-12 flex flex-col md:flex-row gap-6 mt-6">
                        {/* Brand */}
                        {data?.brand && (
                            <div className="flex items-center gap-4 p-4 bg-[#DEF0FF]  rounded-xl shadow-sm hover:shadow-md transition duration-300 w-full md:w-1/2">
                                <img
                                    src={`${baseUrl.replace(/\/$/, "")}/${data?.brand.image.replace(/\\/g, "/")}`}
                                    alt={data?.brand.title}
                                    className="w-16 h-16 object-contain rounded-md"
                                />
                                <div>
                                    <p className="text-md font-semibold text-gray-800">Brand</p>
                                    <p className="text-sm text-gray-600">{data?.brand.title}</p>
                                </div>
                            </div>
                        )}

                        {/* Category */}
                        {data?.shop_by_category && (
                            <div className="flex items-center gap-4 p-4 bg-[#DEF0FF] rounded-xl shadow-sm hover:shadow-md transition duration-300 w-full md:w-1/2">
                                <img
                                    src={`${baseUrl.replace(/\/$/, "")}/${data?.shop_by_category.image.replace(/\\/g, "/")}`}
                                    alt={data?.shop_by_category.title}
                                    className="w-16 h-16 object-contain rounded-md"
                                />
                                <div>
                                    <p className="text-md font-semibold text-gray-800">Category</p>
                                    <p className="text-sm text-gray-600">{data?.shop_by_category.title}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Productdetail;
