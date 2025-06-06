import React, { useEffect, useState, useTransition } from 'react';
import Topnav from '../../Component/Topnav';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getwithheader, postwithheader, putWithJson, deleteapi } from '../../Api/Api';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Loader from '../../Component/Loader';


const Policy = () => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Footer');
    const [detail, setDetail] = useState('');
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleDetail = (event, editor) => {
        const value = editor.getData();
        setDetail(value);
    };
    const handleGet = async () => {
        try {
            const res = await getwithheader('policy');
            if (res?.data) setData(res.data);
        } catch (error) {
            toast.error('Failed to fetch policies');
            console.log(error)
        }
    };

    useEffect(() => {
        handleGet();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { title, type, detail };

        try {
            let res;
            if (editId) {
                res = await putWithJson(`policy/${editId}`, payload);
                toast.success('Policy updated successfully');
            } else {
                res = await postwithheader('policy', payload);
                toast.success('Policy added successfully');
            }

            if (res.error === 0) {
                setTitle('');
                setType('');
                setDetail('');
                setEditId('');
                startTransition(() => handleGet());
            }
        } catch (err) {
            toast.error(err.message || 'Failed to submit policy');
        }
    };

    const handleEdit = (id) => {
        const found = data.find((item) => item._id === id);
        if (found) {
            setEditId(id);
            setTitle(found.title);
            setType(found.type);
            setDetail(found.detail);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this policy?')) return;

        try {
            const res = await deleteapi(`policy/${id}`);
            if (res.error === 0) {
                toast.success('Policy deleted successfully');
                startTransition(() => handleGet());
            }
        } catch (err) {
            toast.error('Error deleting policy');
            console.log(err)
        }
    };

    return (
        <>
            {isPending && <Loader />}
            <Topnav />
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            {/* <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">Type</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Select type</option>
                                    <option value="Footer">Footer</option>
                                    <option value="Page">Page</option>
                                </select>
                            </div> */}
                            <div className="col-span-2">
                                <label className="block text-[#001B48] font-bold mb-2">Description</label>
                                <CKEditor editor={ClassicEditor} data={detail} onChange={handleDetail} />
                            </div>
                            <div className="col-span-1 mt-6">
                                <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="grid grid-cols-1 mt-5">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                                    <th>Title</th>
                                    {/* <th>Type</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{item.title}</td>
                                        {/* <td>{item.type}</td> */}

                                        <td>
                                            <div className="flex gap-3 item-center">
                                                <button className="p-2 rounded-sm shadow text-[20px] text-[#001B48] hover:bg-[#001B48] hover:text-white" onClick={() => handleEdit(item._id)}>
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="p-2 rounded-sm shadow text-[23px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                    onClick={() => handleDelete(item._id)}
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
    );
};

export default Policy;
