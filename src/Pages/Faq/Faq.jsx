import React, { useEffect, useOptimistic, useState, useTransition } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, postwithheader, putWithJson } from '../../Api/Api';
import { toast } from 'react-toastify';

import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';

const Faq = () => {
    const [question, setquestion] = useState("");
    const [answer, setanswer] = useState("");

    const [data, setData] = useState([]);
    const [editId, setEditId] = useState("");
    const [isPending, startTransition] = useTransition();
    const [optimisticData, setOptimisticData] = useOptimistic(data);


    // Fetch data
    const handleGet = async () => {

        try {
            const result = await getwithheader("faq");
            if (result?.data) {
                setData(result.data);
                startTransition(() => setOptimisticData(result.data))
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        handleGet();
    }, []);

    // Handle form submission
    const handleSubmit = async e => {
        e.preventDefault();
        const payload = { question, answer };

        let res;
        try {
            if (editId) {
                res = await putWithJson(`faq/${editId}`, payload);
                toast.success('FAQ updated successfully');
            } else {
                res = await postwithheader('faq', payload);
                toast.success('FAQ added successfully');
            }
            if (res.error === 0) {
                setquestion('');
                setanswer('');
                setEditId(null);
                startTransition(handleGet);
            }
        } catch (err) {
            console.error('Submit error:', err);
            toast.error(err.message || 'Error submitting FAQ');
        }
    };

    // Handle edit
    const handleEdit = (id) => {
        setEditId(id);
        const found = data.find((itm) => itm._id === id);
        if (found) {
            setquestion(found.question);
            setanswer(found.answer);
        }
    };

    const handleDelete = async id => {
        if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
        try {
            const res = await deleteapi(`faq/${id}`);
            if (res.error === 0) {
                toast.success('FAQ deleted successfully');
                startTransition(handleGet);
            }
        } catch (err) {
            console.error('Delete error:', err);
            toast.error('Error deleting FAQ');
        }
    };
    return (
        <>
            {isPending && <Loader />}
            <Topnav />
            <section>
                <div className="container">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="grid grid-cols-4 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Question</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    value={question}
                                    onChange={(e) => setquestion(e.target.value)}
                                    placeholder="Enter Question"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Answer</label>
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => setanswer(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter Answer"
                                    required
                                />
                            </div>
                            <div className="col-span-1 mt-6">
                                <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="grid grid-cols-1 mt-3">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {optimisticData.map((itm) => (
                                    <tr key={itm._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{itm.question}</td>
                                        <td>{itm.answer}</td>

                                        <td>
                                            <div className="flex gap-3 item-center">
                                                <button
                                                    className="edit mt-[2px] p-2 rounded-sm shadow text-[20px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                    onClick={() => handleEdit(itm._id)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="edit mt-[2px] p-2 rounded-sm shadow text-[23px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                    onClick={() => handleDelete(itm._id)}
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

export default Faq

