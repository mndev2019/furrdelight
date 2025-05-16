/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useOptimistic, useState, useTransition } from 'react'
import { toast } from 'react-toastify';
import { baseUrl } from '../../Api/Baseurl';
import { getwithheader, postwithheader, putWithJson } from '../../Api/Api';
import Topnav from '../../Component/Topnav';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Question = () => {
    const [answerModel , setanswerModel] = useState("");
    const [question, setquestion] = useState("");
    const [position, setposition] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [api, setapi] = useState("");
    const [type, settype] = useState("");
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState("");
    const [isPending, startTransition] = useTransition();
    const [optimisticData, setOptimisticData] = useOptimistic(data);
    const [loading, setLoading] = useState(false);

    // Fetch data
    const handleGet = async () => {
        setLoading(true);
        try {
            const result = await getwithheader("pet_form");
            if (result?.data) {
                setData(result.data);
                startTransition(() => setOptimisticData(result.data))
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGet();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {
            question: question,
            position: position,
            api: api,
            type: type,
            answerModel : answerModel,
        };
        if (type === "options") {
            obj.options = [
                { name: option1 },
                { name: option2 },
                { name: option3 },
                { name: option4 },
            ];
        }

        // Optimistic update for instant UI response
        const tempId = Date.now();
        const tempData = { _id: tempId, question };

        startTransition(() => setOptimisticData((prev) => (editId ? prev.map(item => item._id === editId ? tempData : item) : [...prev, tempData])))
        try {
            let response;
            if (editId) {
                response = await putWithJson(`update_pet_form/${editId}`, obj);
                toast.success("Questions update successfully!");
            } else {
                response = await postwithheader("pet_form", obj);
                toast.success("Questions add successfully!");

            }
            if (response.error == 0) {
                startTransition(() => handleGet());
                setquestion("");
                setposition("");
                setanswerModel("");
                setapi("");
                settype("");
                setEditId("");
                setOption1("");
                setOption2("");
                setOption3("");
                setOption4("");
            }
        } catch (error) {
            console.error("Error submitting:", error);
            startTransition(() => setOptimisticData(data))
            toast.error(`${error.message}`);
        }
    };

    // Handle edit
    const handleEdit = (id) => {
        setEditId(id);
        const found = data.find((itm) => itm._id === id);
        if (found) {
            setquestion(found.question);
            setposition(found.position);
            setapi(found.api);
            settype(found.type);
            setanswerModel(found.answerModel);

        }
        if (found.type === "options" && found.options?.length) {
            setOption1(found.options[0]?.name || "");
            setOption2(found.options[1]?.name || "");
            setOption3(found.options[2]?.name || "");
            setOption4(found.options[3]?.name || "");
        } else {
            setOption1("");
            setOption2("");
            setOption3("");
            setOption4("");
        }
    };

    const handleDelete = async (id) => {
        const previousData = optimisticData;
        setOptimisticData((prev) => prev.filter((itm) => itm._id !== id));
        try {
            await fetch(`${baseUrl}delete_pet_form/${id}`, { method: "DELETE" });
            startTransition(() => handleGet());
            toast.success("Questions delete successfully!");
        } catch (error) {
            console.error("Error deleting:", error);
            startTransition(() => setOptimisticData(previousData))
        }
    };

    return (
        <>
            <Topnav />
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-4 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Question</label>
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setquestion(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter question"
                                    required
                                />
                            </div>
                             <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Answer Modal</label>
                                <select
                                    value={answerModel}
                                    onChange={(e) => setanswerModel(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="" disabled>Select  modal</option>
                                    <option value="PetProfileForm" >PetProfileForm</option>
                                    <option value="PetFood" >PetFood</option>
                                      <option value="PetActivity" >PetActivity</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => settype(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="" disabled>Select  type</option>
                                    <option value="grid" >Grid</option>
                                    <option value="options" >Options</option>
                                </select>
                            </div>
                            {
                                type === "options" &&
                                <>
                                    <div className="col-span-1">
                                        <label className="block text-[#001B48] font-bold mb-2">Option 1 </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                            value={option1}
                                            onChange={(e) => setOption1(e.target.value)}
                                            placeholder="Enter option1 "
                                            required
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[#001B48] font-bold mb-2">Option 2 </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                            value={option2}
                                            onChange={(e) => setOption2(e.target.value)}
                                            placeholder="Enter option2 "
                                            required
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[#001B48] font-bold mb-2">Option 3</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                            value={option3}
                                            onChange={(e) => setOption3(e.target.value)}
                                            placeholder="Enter option3 "
                                            required
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-[#001B48] font-bold mb-2">Option 4</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                            value={option4}
                                            onChange={(e) => setOption4(e.target.value)}
                                            placeholder="Enter option4"
                                            required
                                        />
                                    </div>
                                </>
                            }
                            {
                                type === "grid" &&
                                <>
                                    <div className="col-span-1">
                                        <label className="block text-[#001B48] font-bold mb-2">Api </label>
                                        <input
                                            type="text"
                                            value={api}
                                            onChange={(e) => setapi(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                            placeholder="Enter question "
                                            required
                                        />
                                    </div>
                                </>
                            }
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Position </label>
                                <input
                                    type="text"
                                    value={position}
                                    onChange={(e) => setposition(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter question "
                                    required
                                />
                            </div>

                            <div className="col-span-1 mt-6">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={`py-2 px-4 rounded text-white ${isPending ? "bg-gray-400" : "bg-[#001B48]"}`}
                                >
                                    {editId ? "Update" : "Submit"}
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* Loader */}
                    {loading && (
                        <div className="text-center py-4">
                            <span className="text-[#001B48] font-semibold">Loading...</span>
                        </div>
                    )}

                    {!loading && (
                        <div className="grid grid-cols-1 mt-3">
                            <table className="w-full border-separate border-spacing-y-1">
                                <thead>
                                    <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100 ">
                                        <th>question </th>
                                        <th>Option1</th>
                                        <th>Option 2</th>
                                        <th>Option 3</th>
                                        <th>Option 4</th>
                                        <th>Api</th>
                                        <th>Position</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {optimisticData.map((itm) => (
                                        <tr key={itm._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                            <td>{itm.question}</td>
                                            {[...Array(4)].map((_, index) => (
                                                <td key={index}>
                                                    {itm.options && itm.options[index] ? itm.options[index].name : "NA"}
                                                </td>
                                            ))}
                                            <td>
                                                {itm.api}
                                            </td>
                                            <td>
                                                {itm.position}
                                            </td>
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
                    )}
                </div>
            </section>
        </>
    )
}

export default Question

