import moment from "moment"

import axios from "axios";
import React, { useRef, useState } from "react";
import Topnav from '../../Component/Topnav'
import { baseUrl } from "../../Api/Baseurl";
import Loader from "../../Component/Loader";
// import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

const BankTransaction = () => {

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
    const [show, setShow] = React.useState(false);
    const [banks, setBanks] = useState([]);
    const [fdata, setFdata] = useState({});
    const getbanks = async () => {
        try {
            const resp = await axios.get(baseUrl + "doctor/bank", {
                headers: {
                    Authorization: "Bearer " + mtoken,
                },
                params: {
                    doctor_id: doctor._id
                }
            });
            setBanks(resp.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleOpenTranaction = () => {
        setShow(!show);
    }
    const saveTransaction = async () => {
        try {
            const resp = await axios.post(baseUrl + "transaction", { ...fdata, doctor: doctor._id, "transaction_type": "Credit" }, {
                headers: {
                    Authorization: "Bearer " + mtoken,
                }
            });
            if (resp.data.success == "1") {
                setDoctors([]);
                setSelectDoctor(false);
                setBanks([]);
                setShow(false);
                setOpen(false);
                getreports();
                setFdata({});
            }
        } catch (err) {
            console.log(err);
        }
    }
    const textref = useRef();
    const getreports = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(baseUrl + "transaction", {
                headers: {
                    Authorization: "Bearer " + mtoken
                },
                params: {
                    doctor_id: doctor._id,
                    from_date: from_date,
                    to_date: to_date
                }
            });

            setItems(resp.data.data);
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
    const handleToDate = (e) => {
        e.preventDefault();
        if (!from_date) {
            alert('Please select from date first');
            return false;
        }
        let fdate = e.target.value
        setToDate(fdate);

    }
    const selectDoctor = (obj) => {
        setSelectDoctor(obj);
        setOpen(false);
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
        if (doctor) {
            getbanks();
        }

    }, [doctor]);
    React.useEffect(() => {
        getdoctors();
    }, [keyword]);
    React.useEffect(() => {
        getreports();
    }, []);
    const handleTrData = (e) => {
        const { name, value } = e.target;
        setFdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleKeyword = (e) => {
        try {
            const value = e.target.value;
            setKeyword(value);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Topnav />
            <section className="relative mt-3">
                {/* <Dialog size="xs" open={show}>
                    <DialogHeader className="bg-[var(--primary)] text-white rounded-t-lg">
                        <h4>Create New Transaction</h4>
                    </DialogHeader>
                    <DialogBody>
                        <div className="form-group mb-7">

                            <div className="w-full relative">
                                <div className="w-full" onClick={handleOpen}>
                                    <label htmlFor="">Select Doctor</label>
                                    <div className={"w-full p-2 border border-blue-gray-400 outline-0 rounded text-sm focus:outline-none cursor-pointer"}>
                                        {doctor ? doctor.name : " Search "}
                                    </div>
                                </div>
                                {
                                    open && (
                                        <>
                                            <div className="absolute  top-full p-3 z-50 bg-white shadow-md shadow-blue-200 start-0 w-full">
                                                <input type="text" value={keyword} onChange={handleKeyword} ref={textref} name="" id="" className={"w-full p-2 border border-blue-gray-400 outline-0 rounded text-sm focus:outline-none bg-white"} />
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
                        <div className="form-group mb-7">
                            <label htmlFor="">Select Bank</label>
                            <select name="bank" id="bank" onChange={handleTrData} className="w-full p-2 border border-blue-gray-400 outline-0 rounded text-sm focus:outline-none">
                                <option value="">Select</option>
                                {
                                    banks.map(itm => (
                                        <>
                                            <option value={itm._id}>{itm.bank_name + " " + itm.account_number}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group mb-7">
                            <label htmlFor="">Select Date</label>
                            <input type="date" name="transaction_date" onChange={handleTrData} max={moment().format('YYYY-MM-DD')} className="w-full p-2 border border-blue-gray-400 outline-0 rounded text-sm focus:outline-none" id="" />
                        </div>
                        <div className="form-group mb-7">
                            <label htmlFor="">Enter Amount</label>
                            <input type="number" name="amount" onChange={handleTrData} className="w-full p-2 border border-blue-gray-400 outline-0 rounded text-sm focus:outline-none" id="" />
                        </div>
                        <div className="form-group">
                            <Button variant="gradient" onClick={saveTransaction} color="teal" className="w-full">Submit</Button>
                        </div>
                    </DialogBody>

                </Dialog> */}
                {show && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
                            {/* Modal Header */}
                            <div className="bg-[#001B48] text-white px-4 py-3 rounded-t-lg">
                                <h4 className="text-lg font-semibold">Create New Transaction</h4>
                            </div>

                            {/* Modal Body */}
                            <div className="p-4 max-h-[80vh] overflow-y-auto">
                                {/* Doctor Selection */}
                                <div className="mb-6">
                                    <label className="block mb-1">Select Doctor</label>
                                    <div className="relative">
                                        <div className="w-full p-2 border border-blue-gray-400 rounded text-sm cursor-pointer" onClick={handleOpen}>
                                            {doctor ? doctor.name : "Search"}
                                        </div>

                                        {open && (
                                            <div className="absolute top-full mt-2 w-full bg-white shadow-md z-50 p-3">
                                                <input
                                                    type="text"
                                                    value={keyword}
                                                    onChange={handleKeyword}
                                                    ref={textref}
                                                    className="w-full p-2 border border-blue-gray-400 rounded text-sm bg-white mb-2"
                                                />
                                                <ul className="max-h-[300px] overflow-y-auto">
                                                    {doctors.map((doc) => (
                                                        <li key={doc._id}>
                                                            <span
                                                                onClick={() => selectDoctor(doc)}
                                                                className="block px-2 py-1 cursor-pointer text-sm bg-gray-200 hover:bg-gray-300"
                                                            >
                                                                {doc.name}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Bank Selection */}
                                <div className="mb-6">
                                    <label className="block mb-1">Select Bank</label>
                                    <select
                                        name="bank"
                                        id="bank"
                                        onChange={handleTrData}
                                        className="w-full p-2 border border-blue-gray-400 rounded text-sm"
                                    >
                                        <option value="">Select</option>
                                        {banks.map((itm) => (
                                            <option key={itm._id} value={itm._id}>
                                                {itm.bank_name + " " + itm.account_number}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date Input */}
                                <div className="mb-6">
                                    <label className="block mb-1">Select Date</label>
                                    <input
                                        type="date"
                                        name="transaction_date"
                                        max={moment().format("YYYY-MM-DD")}
                                        onChange={handleTrData}
                                        className="w-full p-2 border border-blue-gray-400 rounded text-sm"
                                    />
                                </div>

                                {/* Amount Input */}
                                <div className="mb-6">
                                    <label className="block mb-1">Enter Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        onChange={handleTrData}
                                        className="w-full p-2 border border-blue-gray-400 rounded text-sm"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        onClick={saveTransaction}
                                        className="w-full bg-[#001B48] text-white py-2 px-4 rounded cursor-pointer"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {
                    loading && (
                        <>
                            <Loader />
                        </>
                    )
                }
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-2 mb-10">
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
                            <button onClick={handleOpenTranaction} className="w-full py-2 mt-6 text-xs text-white rounded bg-orange-500">Create New</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                        <div className="col-span-12">
                            <table className="w-full border-separate border-spacing-y-1">
                                <thead>
                                    <tr className='*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100'>
                                        <th>Sr</th>
                                        <th>Doctor</th>
                                        <th>Transaction Date</th>
                                        <th>Transaction Type</th>
                                        <th>Amount</th>
                                        <th>Bank</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.map((itm, index) => (
                                            <>
                                                <tr className='*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r  *:border-gray-100'>
                                                    <td>
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {itm.doctor?.name}

                                                    </td>
                                                    <td>
                                                        {itm.transaction_date}
                                                    </td>
                                                    <td>
                                                        {itm.transaction_type}
                                                    </td>
                                                    <td>
                                                        {itm.amount}
                                                    </td>
                                                    <td>
                                                        {itm.bank.bank_name + " " + itm.bank.account_number}
                                                    </td>

                                                </tr>
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BankTransaction
