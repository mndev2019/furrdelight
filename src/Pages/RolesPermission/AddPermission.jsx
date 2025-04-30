import React, { useEffect, useState, useTransition, useOptimistic } from "react";
import Topnav from "../../Component/Topnav";
import { postwithheader, putWithoutHeader, getwithheader } from "../../Api/Api";
import { toast } from "react-toastify";

const AddPermission = () => {
    const token = localStorage.getItem("token")
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState("");
    const [isPending, startTransition] = useTransition();
    const [optimisticData, setOptimisticData] = useOptimistic(data);
    const [loading, setLoading] = useState(false);
    const [usertypedata, setusertypedata] = useState([]);

    // Fetch data
    const handleGet = async () => {
        setLoading(true);
        try {
            const result = await getwithheader("module", token);
            if (result?.data) {
                setData(result.data);
                startTransition(() => setOptimisticData(result.data));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);

        }
    };
    const fetchusertype = async () => {
        try {
            const response = await getwithheader('user_type', token);
            setusertypedata(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error(`${error.message}`);
        }
    };

    useEffect(() => {
        handleGet();
        fetchusertype();
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
                response = await putWithoutHeader(`module/${editId}`, obj);
                toast.success("unit update successfully!");
            } else {
                response = await postwithheader("module", obj);
                toast.success("unit add successfully!");

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





    return (
        <>
            <Topnav />
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">User Type</label>
                                <select
                                    // value={pet_type}
                                    // onChange={(e) => setpet_type(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                >
                                    <option value="">Select a user type</option>
                                    {usertypedata.map((itm) => (
                                        <option value={itm._id} key={itm._id}>{itm.title}</option>
                                    ))}
                                </select>
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


                </div>
            </section>
        </>
    );
};

export default AddPermission;
