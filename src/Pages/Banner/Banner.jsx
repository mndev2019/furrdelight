import React, { useEffect, useState } from 'react'
import Topnav from "../../Component/Topnav";
import { deleteapi, getWithoutHeader, Postwithformdata } from '../../Api/Api';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { baseUrl } from '../../Api/Baseurl';

const Banner = () => {
    const [image, setimage] = useState("");
    const [title, settitle] = useState("");
    const [data, setdata] = useState([]);
    const handlefile = (e) => {
        e.preventDefault()
        let selectedfile = e.target.files[0]
        console.log(selectedfile)
        setimage(selectedfile)
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("image", image);
        try {
            const response = await Postwithformdata("create_banner", formdata);
            console.log("Response:", response);
            settitle("");
            setimage("");
        } catch (error) {
            console.error("Error submitting:", error);
        }
    }
    const handleget = async () => {
        try {
            const resp = await getWithoutHeader("banner");
            setdata(resp.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        handleget();
    }, [])
    const handledelete = async (id) => {
       
      
        await deleteapi(`banner_delete/${id}`).then(handleget).catch(console.error);
    };

    return (
        <>
            <Topnav />
            <section>
                <div className="container">
                    <form onSubmit={handlesubmit}>
                        <div className="grid grid-cols-3 mt-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-[#001B48] font-bold mb-2">
                                    Upload Image
                                </label>
                                <input
                                    type="file"

                                    onChange={handlefile}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                                    required
                                />
                            </div>
                            <div className="col-span-1 mt-6">
                                <button
                                    type="submit"
                                    className={`py-2 px-4 rounded text-white bg-[#001B48]`}
                                >
                                    Update
                                </button>
                            </div>

                        </div>
                    </form>
                    <div className="grid grid-cols-1 mt-3">
                        <table className="w-full border-separate border-spacing-y-1">
                            <thead>
                                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100 ">
                                    <th>Title</th>
                                    <th>
                                        Image
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((itm) => (
                                    <tr key={itm._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                                        <td>{itm.title}</td>
                                        <td ><img src={`${baseUrl}${itm.image}`} className='h-10 w-10 rounded-full' /></td>
                                        <td>
                                            <div className="flex gap-3 item-center">
                                                <button
                                                    className="edit mt-[2px] p-2 rounded-sm shadow text-[20px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                //   onClick={() => handleEdit(itm._id)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="edit mt-[2px] p-2 rounded-sm shadow text-[23px] text-[#001B48] hover:bg-[#001B48] hover:text-white"
                                                    onClick={() => handledelete(itm._id)}
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

export default Banner
