import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';


// import PageHeader from '../Component/PageHeader';
import { getwithheader, postwithheader, putwithheader } from '../../Api/Api';
import Topnav from '../../Component/Topnav';
import Loader from '../../Component/Loader';

function AddPermission() {
    const { state } = useLocation();
    const { id } = useParams()
    console.log(state)
    const [name, setName] = useState("");
    const [phone, setphone] = useState("");

    const [usertype, setusertype] = useState("");

    const [usertypedata, setUsertypedata] = useState([]);
    const [moduledata, setModuledata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});

    // const location = useLocation()

    // const vendorpage = location.pathname == `/addpermission/${id}`



    const token = localStorage.getItem("token");

    const handleEdit = () => {
        setName(state?.name);
        setusertype(state.usertype?._id ?? state.usertype);
        setphone(state.phone)
        const formattedRoles = state?.roles?.map(role => ({
            type: role?.type?._id,
            value: role.value
        }));



        const rolesObject = moduledata?.reduce((acc, module) => {
            const matchedRole = formattedRoles.find(role => role.type == module._id);


            if (matchedRole) {
                acc[module._id] = matchedRole.value.map(value => ({ label: value, value }));
            } else {
                acc[module._id] = [];
            }
            return acc;
        }, {});
        setSelectedOptions(rolesObject);
    };
    const handleGet = async () => {
        setLoading(true);
        let res = await getwithheader('user_type', token);
        if (!res.error) {
            setLoading(false);
            setUsertypedata(res.data);
        }
    };

    const handleModule = async () => {
        setLoading(true);
        let res = await getwithheader('module', token);
        if (!res.error) {
            setLoading(false);
            setModuledata(res.data);
        }
    };

    useEffect(() => {
        handleGet();
        handleModule();
    }, []);

    useEffect(() => {
        if (state || id) {
            handleEdit()
        }
    }, [state, moduledata, id])


    console.log(state)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const formattedRoles = Object.entries(selectedOptions).map(([key, value]) => ({
            type: key,
            value: value.map(option => option.value)
        }));

        const requestdata = {
            name: name,
            roles: formattedRoles,
            ...(id ? {} : { user_type: usertype }) // Conditionally add usertype if id is not present
        };


        let res = ""
        if (state) {

            if (id) {
                await putwithheader(`users/${state._id}`, requestdata, token)

            } else {

                await putwithheader(`default-permission/${state._id}`, requestdata, token)
            }
        } else {
            await postwithheader('default-permission', requestdata, token)
        }

        if (!res.error) {

            setLoading(false)
            toast.success("Data Submit Succesffully")
            navigate('/default-permission');
            // if (vendorpage) {
            //     navigate('/user')
            // } else {
            //     navigate(-1)
            // }


        } else {
            setLoading(false)
        }
    };

    const handleSelectChange = (moduleId, selectedOption) => {
        setSelectedOptions(prev => ({ ...prev, [moduleId]: selectedOption }));
    };

    const options = [
        { value: 'Read', label: 'Read' },
        { value: 'Write', label: 'Write' },
        { value: 'Update', label: 'Update' },
        { value: 'Delete', label: 'Delete' },
    ];

    return (
        <>
            {loading && <Loader />}
            <Topnav />
            <section className='pt-3'>
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                            <form className="" onSubmit={handleSubmit}>
                                {id ? <div className="grid grid-cols-2 gap-4 items-center">
                                    <div className="col-span-1">
                                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Phone</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={phone}
                                            readOnly
                                            disabled
                                            onChange={(e) => setphone(e.target.value)}
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                </div> : <div className="grid grid-cols-2 gap-4 items-center">
                                    <div className="col-span-1">
                                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="type" className="block text-gray-700 text-sm font-medium mb-2">User Type</label>
                                        <select name="type" id="type" className="block w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={usertype} onChange={(e) => setusertype(e.target.value)}>
                                            <option value="" className='hidden' selected>Select User Type</option>
                                            {usertypedata.map((item) => (
                                                <option key={item._id} value={item._id}>{item.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>}
                                <div className="grid grid-cols-3 gap-4 items-center mt-6">
                                    <div className="col-span-3">
                                        <h3 className='maintitle mt-4 mb-3 text-3xl font-semibold headlandfont'>Roles</h3>
                                    </div>
                                    {moduledata?.map((item) => (
                                        <div key={item._id} className="col-span-1 mb-4">
                                            <div className="mb-1">
                                                <label htmlFor={`module-${item._id}`} className="block text-lg font-semibold headlandfont text-gray-700 mb-1">{item.name}</label>
                                            </div>
                                            <Select
                                                id={`module-${item._id}`}
                                                value={selectedOptions[item._id] || []}
                                                onChange={(selectedOption) => handleSelectChange(item._id, selectedOption)}
                                                options={options}
                                                isMulti
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="cursor-pointer w-full bg-[#001B48]  text-white font-semibold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        {state ? "Update" : "Add"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddPermission;
