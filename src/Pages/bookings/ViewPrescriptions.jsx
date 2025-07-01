import axios from 'axios';
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


import SinglePrescriptionCategoryBox from './SinglePrescriptionCategoryBox';
import { baseUrl } from '../../Api/Baseurl';

const ViewPrescriptions = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCaregories] = React.useState([]);
    const [pitems, setPitems] = React.useState([]);
    const mtoken = localStorage.getItem("token");
    const getcategories = async () => {
        try {
            const resp = await axios.get(baseUrl + "prescription/category", {
                headers: {
                    Authorization: "Bearer " + mtoken
                }
            });
            setCaregories(resp.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getpitems = async () => {
        try {
            const resp = await axios.get(baseUrl + "prescription", {
                headers: {
                    Authorization: 'Bearer ' + mtoken
                },
                params: {
                    booking_id: id
                }
            });
            setPitems(resp.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        getcategories();
        getpitems();
    }, [id]);
    const gotoback = () => {
        navigate(-1);
    }
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 text-end">
                            <Link to={'/prescription/print/' + id} className = "me-5">Print</Link>
                            <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" onClick={gotoback}>
                                Back
                            </button>

                        </div>
                        <div className="col-span-12">
                            <div className="w-full">
                                <div className="grid grid-cols-4">
                                    <div className="w-full">
                                        <label htmlFor="" className='block text-[#001B48] font-bold mb-2'>Select Heading</label>
                                        <select name="" id="" className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]'>
                                            <option value="">Select</option>
                                            {
                                                categories.map(itm => (
                                                    <>
                                                        <option value={itm._id}>{itm.title}</option>
                                                    </>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            {pitems.length == 0 && (
                                <>
                                    <p className="text-red-500 bg-red-100 p-4">
                                        No prescription found
                                    </p>
                                </>
                            )}

                        </div>
                        {
                            pitems.map((itm) => (
                                <>
                                    <div className="col-span-6">
                                        <h4 className='text-sm font-bold tracking-wider w-full  rounded-lg   p-2'>{itm.category.title}</h4>


                                        <SinglePrescriptionCategoryBox itm={itm.text} />



                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewPrescriptions
