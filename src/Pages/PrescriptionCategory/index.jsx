
import React from 'react'
// import { baseUrl, formcontrol, token } from '../../utils';
// import FormLabel from '../../Components/FormLabel';
// import { Button } from '@material-tailwind/react';
// import { toast } from 'react-toastify';
// import { EditOutlined } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../../Api/Baseurl';
import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { deleteapi, putWithJson } from '../../Api/Api';

const PresciptionCategory = () => {
    const mtoken = localStorage.getItem("token");
    const [items, setItems] = React.useState([]);
    const [fvals, setFvals] = React.useState({});
    const [fkeys, setFkeys] = React.useState([{ label: "Enter Description", input_type: "text" }]);
    const [edit_id, setEditid] = React.useState('');
    const handleEdit = (id) => {
        setEditid(id);
        getHeadingDetails(id);
    }
    const getHeadingDetails = async (id) => {
        const resp = await axios.get(baseUrl + "prescription/category", {
            headers: {
                Authorization: "Bearer " + mtoken
            },
            params: {
                id: id
            }
        });
        const keyfind = resp.data.data[0];
        const fobj = {
            title: keyfind.title,
            order: keyfind.order,

        }
        const formarr = keyfind.form.map(itm => ({ label: itm.label, input_type: itm.input_type }));
        setFvals(fobj);
        setFkeys(formarr.length > 0 ? formarr : [{ label: "Enter Description", input_type: "text" }]);
    }
    const add_key = () => {
        const arr = [...fkeys, { label: "Enter Description", input_type: "text" }];
        setFkeys(arr);
    }
    const handleRemove = (index) => {
        const arr = [...fkeys];
        arr.splice(index, 1);
        setFkeys(arr);
    }
    const handlefkeys = (e, index) => {
        const { name, value } = e.target;
        const arr = [...fkeys];
        arr[index][name] = value;
        setFkeys(arr);
    }
    const handleCategory = async (e) => {
        e.preventDefault();
        const data = { ...fvals, form: fkeys };
        let resp;
        if (!edit_id) {
            resp = await axios.post(baseUrl + "prescription/category", data, {
                headers: {
                    Authorization: "Bearer " + mtoken
                }
            });
        } else {
            resp = await axios.put(baseUrl + "prescription/category/update/" + edit_id, data, {
                headers: {
                    Authorization: "Bearer " + mtoken
                }
            });
        }

        if (resp.data.success == "1") {
            toast.success('Created successfully');
            getitems();
            setFvals({});
            setEditid('');
            setFkeys([{ label: "Enter Description", input_type: "text" }]);

        }
    }
    const handleFvals = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        setFvals((prev) => ({
            ...prev,
            [name]: val
        }))
    }
    const getitems = async () => {
        const resp = await axios.get(baseUrl + "prescription/category", {
            headers: {
                Authorization: "Bearer " + mtoken
            }
        });
        setItems(resp.data.data);
    }
    React.useEffect(() => {
        getitems();
    }, []);
    const handledelete = async (id) => {
        if (confirm('Are you sure you want to delete?')) {
            try {
                const response = await deleteapi(`prescription/category/delete/${id}`);
                if (response && response.error === 0) {
                    toast.success(response.message);
                    getitems();
                } else {
                    toast.error(response.message);
                    console.error("Error deleting:", response.message);
                    alert("Failed to delete. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="grid grid-cols-12 mb-5">
                        <div className="col-span-12">
                            <form onSubmit={handleCategory} method="post">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-3">
                                        <label className="block text-[#001B48] font-bold mb-2">Enter Title</label>

                                        <input type="text" name="title" value={fvals?.title} id="" onChange={handleFvals} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="block text-[#001B48] font-bold mb-2">Enter Order</label>

                                        <input type="text" name="order" value={fvals?.order} onChange={handleFvals} id="" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" />
                                    </div>
                                    <div className="col-span-12"></div>
                                    <div className="col-span-12">Inner Form</div>
                                    {
                                        fkeys.map((itm, index) => (
                                            <>
                                                <div className="col-span-3">
                                                    <label className="block text-[#001B48] font-bold mb-2">Enter Form Key</label>

                                                    <input type="text" name="label" onChange={(e) => handlefkeys(e, index)} value={itm.label} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" />
                                                </div>
                                                <div className="col-span-3">
                                                    <label className="block text-[#001B48] font-bold mb-2">Enter Form Key Type</label>

                                                    <input type="text" name="input_type" onChange={(e) => handlefkeys(e, index)} value={itm.input_type} id="" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]" />
                                                </div>
                                                <div className="col-span-3">
                                                    <div className="flex mt-7 items-center">


                                                        {
                                                            index + 1 == fkeys.length && (
                                                                <>
                                                                    <button onClick={add_key} className=" rounded-full px-8 text-xs py-1 bg-[#001B48] text-white">Add</button>

                                                                </>
                                                            )
                                                        }
                                                        {
                                                            index > 0 && (
                                                                <>
                                                                    <button onClick={() => handleRemove(index)} className="px-6 rounded-full mx-4 py-1 bg-red-500 text-white text-xs">Remove</button>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-span-12"></div>
                                            </>
                                        ))
                                    }

                                    <div className="col-span-3">
                                        <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" >
                                            Submit
                                        </button>
                                        {/* <Button size='sm' type='submit' className='mt-6' variant='gradient' color='teal'>Submit</Button> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        {
                            items.map(itm => (
                                <>
                                    <div className="col-span-4 ">
                                        <div className="w-full rounded-lg  relative px-2 py-4 gradientBg shadow-md shadow-gray-400">
                                            <button onClick={() => handleEdit(itm._id)} className='absolute top-0 end-0 size-7 rounded-full inline-flex items-center justify-center bg-red-100 text-red-400'>
                                                <MdOutlineModeEdit fontSize='small' />
                                            </button>
                                            <button onClick={() => handledelete(itm._id)} className='absolute top-0 end-9 size-7 rounded-full inline-flex items-center justify-center bg-red-100 text-red-400'>
                                                <MdDelete fontSize='small' />
                                            </button>
                                            {itm.title}
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

export default PresciptionCategory
