import React, { useEffect, useState, useTransition, useOptimistic } from "react";
import Topnav from "../../Component/Topnav";
import { baseUrl } from "../../Api/Baseurl";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { postwithheader, putWithoutHeader, getwithheader } from "../../Api/Api";
import { toast } from "react-toastify";

const Unit = () => {
    const token = localStorage.getItem("token")
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState("");
    const [isPending, startTransition] = useTransition();
    const [optimisticData, setOptimisticData] = useOptimistic(data);
    const [loading, setLoading] = useState(false);

    // Fetch data
    const handleGet = async () => {
        setLoading(true);
        try {
            const result = await getwithheader("unit", token);
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
        const obj = { title };

        // Optimistic update for instant UI response
        const tempId = Date.now();
        const tempData = { _id: tempId, title };

        startTransition(() => setOptimisticData((prev) => (editId ? prev.map(item => item._id === editId ? tempData : item) : [...prev, tempData])))

        try {
            let response;
            if (editId) {
                response = await putWithoutHeader(`unit/${editId}`, obj);
                toast.success("usertype update successfully!");
            } else {
                response = await postwithheader("unit", obj);
                toast.success("usertype add successfully!");

            }

            if (response.error == 0) {
                startTransition(() => handleGet());
                setTitle("");
                setEditId("");
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
            setTitle(found.title);
        }
    };

    const handleDelete = async (id) => {
        const previousData = optimisticData;


        setOptimisticData((prev) => prev.filter((itm) => itm._id !== id));

        try {
            await fetch(`${baseUrl}delete_unit/${id}`, { method: "DELETE" });
            startTransition(() => handleGet());
            toast.success("usertype delete successfully!");
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
                        <div className="grid grid-cols-3 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter title"
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
                                        <th>Title</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {optimisticData.map((itm) => (
                                        <tr key={itm._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                            <td>{itm.title}</td>
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
    );
};

export default Unit;
