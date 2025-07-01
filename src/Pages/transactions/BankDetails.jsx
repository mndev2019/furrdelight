import axios from 'axios';
import React, { useRef } from 'react'
import moment from 'moment';
import { baseUrl } from '../../Api/Baseurl';
import Loader from "../../Component/Loader";
import { BsFillInfoCircleFill } from 'react-icons/bs';
import Topnav from '../../Component/Topnav'


const BankDetails = () => {
    const [banks, setBanks] = React.useState([]);
    const mtoken = localStorage.getItem("token");
    const [keyword, setKeyword] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [doctors, setDoctors] = React.useState([]);
    const [doctor, setSelectDoctor] = React.useState(false);
    const [from_date, setFromDate] = React.useState('');
    const [to_date, setToDate] = React.useState('');
    const [min_date, setMinDate] = React.useState(moment().format('YYYY-MM-DD'));
    const [loading, setLoading] = React.useState(false);
    const textref = useRef();
    const getreports = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(baseUrl + "doctor/bank", {
                headers: {
                    Authorization: "Bearer " + mtoken
                },
                params: {
                    doctor_id: doctor._id
                }
            });
            setBanks(resp.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    const handleFromDate = (e) => {
        let fdate = e.target.value
        setFromDate(fdate);
        console.log(fdate);
        setMinDate((moment(fdate).format('YYYY-MM-DD')))
    }
    const handleToDate = (e) => {
        e.preventDefault();
        if (!from_date) {
            alert('Please select from date first');
            return false;
        }
        let fdate = e.target.value
        setToDate(fdate);

    }
    const getdoctors = async () => {
        try {
            const resp = await axios.get(baseUrl + "doctor", {
                params: {
                    keyword
                }
            });
            setDoctors(resp.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getdoctors();
    }, [keyword]);

    const handleKeyword = (e) => {
        try {
            const value = e.target.value;
            setKeyword(value);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOpen = () => {
        setOpen((prev) => {
            const newState = !prev;
            if (!prev) {
                setTimeout(() => {
                    textref.current?.focus();
                }, 0);
            }
            return newState;
        });
    };
    const selectDoctor = (obj) => {
        setSelectDoctor(obj);
        setOpen(false);
    }

    return (
        <>
            <Topnav />
            <section className='relative mt-3'>
                {
                    loading && (
                        <>
                            <Loader />
                        </>
                    )
                }
                <div className="container">
                    <div className="w-full mb-10">
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-5">
                                <div className="w-full relative">
                                    <div className="w-full" onClick={handleOpen}>
                                        <label htmlFor="">Select Doctor</label>
                                        <div className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48] cursor-pointer">
                                            {doctor ? doctor.name : " Search "}
                                        </div>
                                    </div>
                                    {
                                        open && (
                                            <>
                                                <div className="absolute  top-full p-3 z-50 bg-white shadow-md shadow-blue-200 start-0 w-full">
                                                    <input type="text" value={keyword} onChange={handleKeyword} ref={textref} name="" id="" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48] bg-white" />
                                                    <ul className='*:py-1 *:shadow-xs *:shadow-gray-300 max-h-[400px] overflow-y-auto'>
                                                        {
                                                            doctors.map(doc => (
                                                                <>
                                                                    <li>
                                                                        <span onClick={() => selectDoctor(doc)} className="cursor-pointer block px-1 py-2 text-sm bg-gray-200">{doc.name}</span>
                                                                    </li>
                                                                </>
                                                            ))
                                                        }

                                                    </ul>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>

                            </div>
                            <div className="col-span-3 hidden">
                                <label htmlFor="">From Date</label>
                                <input type="date" max={moment().format('YYYY-MM-DD')} name="from_date" onChange={handleFromDate} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" id="" />
                            </div>
                            <div className="col-span-3 hidden">
                                <label htmlFor="">To Date</label>
                                <input type="date" value={to_date} min={min_date} onChange={handleToDate} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" id="" />
                            </div>
                            <div className="col-span-1">
                                <button onClick={getreports} className="w-full py-2 mt-6 text-xs text-white rounded bg-[#001B48]">Find</button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                            {
                                banks.length == 0 && (
                                    <>
                                        <div className="w-full  text-white rounded text-sm p-4 bg-red-500 flex gap-2 items-center">
                                            <BsFillInfoCircleFill />  No Account found
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        {
                            banks.map(itm => (
                                <>
                                    <div className="col-span-4">
                                        <div className="w-full">
                                            <table className="table">
                                                <tr className='*:text-xs *:text-start *:p-2 *:border *:border-gray-500'>
                                                    <th>Bank</th>
                                                    <th>{itm.bank_name}</th>
                                                </tr>
                                            </table>
                                        </div>
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

export default BankDetails

