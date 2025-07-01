import axios from 'axios';
import React, { useRef } from 'react'

import moment from 'moment';
import Topnav from '../../Component/Topnav'
import { baseUrl } from '../../Api/Baseurl';
import Loader from '../../Component/Loader';


const TransactionReport = () => {
    const [reports, setReports] = React.useState(false);
    const mtoken = localStorage.getItem("token");
    const [keyword, setKeyword] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [doctors, setDoctors] = React.useState([]);
    const [doctor, setSelectDoctor] = React.useState(false);
    const [from_date, setFromDate] = React.useState('');
    const [to_date, setToDate] = React.useState('');
    const [min_date, setMinDate] = React.useState(moment().format('YYYY-MM-DD'));
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const textref = useRef();
    const getreports = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(baseUrl + "booking/report", {
                headers: {
                    Authorization: "Bearer " + mtoken
                },
                params: {
                    doctor_id: doctor._id,
                    from_date: from_date,
                    to_date: to_date
                }
            });
            setReports(resp.data.data);
            setItems(resp.data.list);
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
                                        <div className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]">
                                            {doctor ? doctor.name : " Search "}
                                        </div>
                                    </div>
                                    {
                                        open && (
                                            <>
                                                <div className="absolute  top-full p-3 z-50 bg-white shadow-md shadow-blue-200 start-0 w-full">
                                                    <input type="text" value={keyword} onChange={handleKeyword} ref={textref} name="" id="" className="w-full" />
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
                            <div className="col-span-3">
                                <label htmlFor="">From Date</label>
                                <input type="date" max={moment().format('YYYY-MM-DD')} name="from_date" onChange={handleFromDate} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" id="" />
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="">To Date</label>
                                <input type="date" value={to_date} min={min_date} onChange={handleToDate} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" id="" />
                            </div>
                            <div className="col-span-1">
                                <button onClick={getreports} className="w-full py-2 mt-6 text-xs text-white rounded bg-[#001B48]">Find</button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12"></div>

                        <div className="col-span-12"></div>
                        {
                            Object.entries(reports).map(([keyc, valuec]) => (
                                <>
                                    <div className="col-span-3">
                                        <div className="w-full h-full p-3 rounded bg-white border border-[var(--primary)]">
                                            <h4 className='capitalize font-bold text-lg text-[var(--primary)]'>{keyc.split('_').join(' ')}</h4>
                                            <h2 className='text-xl font-bold'>{valuec}</h2>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                        <div className="col-span-12">
                            <div className="w-full">
                                <table className="w-full border-separate border-spacing-y-1">
                                    <thead>
                                        <tr className='*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100'>
                                            <th>Sr No</th>
                                            <th>Transaction Date</th>
                                            <th>Amount</th>
                                            <th>Booking Status</th>
                                            <th>Payment Status</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map((itm, index) => (
                                                <>
                                                    <tr className='*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r  *:border-gray-100'>
                                                        <td>
                                                            {(1 - 1) * 10 + index + 1}
                                                        </td>
                                                        <td>
                                                            {moment(itm.createdAt).format('DD-MM-YY hh:mm A')}
                                                        </td>
                                                        <td>
                                                            ₹{itm.consultation_charge}
                                                        </td>
                                                        <td>
                                                            {
                                                                itm.status == "booked" && (
                                                                    <>
                                                                        <span className="text-white bg-green-600 rounded px-5 inline-block py-1 text-xs">Booked</span>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                itm.status == "Cancelled" && (
                                                                    <>
                                                                        <span className="text-white bg-red-600 rounded px-5 inline-block py-1 text-xs">Cancelled</span>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                itm.status == "Completed" && (
                                                                    <>
                                                                        <span className="text-white bg-blue-600 rounded px-5 inline-block py-1 text-xs">Completed</span>
                                                                    </>
                                                                )
                                                            }
                                                        </td>
                                                        <td>
                                                            <ul>
                                                                <li>
                                                                    Order Id : {itm.order_id}
                                                                </li>
                                                                <li>
                                                                    status : {itm.payment_status}
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td></td>


                                                    </tr>
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default TransactionReport
