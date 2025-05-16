import React, { useEffect, useState, useTransition } from 'react'
import Topnav from '../../Component/Topnav'
import { deleteapi, getwithheader, postwithheader, putwithheader } from '../../Api/Api';
import { toast } from 'react-toastify';
import Loader from '../../Component/Loader';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
// import moment from 'moment';

const Upcomingrecords = () => {
  const token = localStorage.getItem("token")
  // const navigate = useNavigate();
  const [name, setname] = useState("");
  // const [time, settime] = useState("");
  // const [date, setdate] = useState("");
  const [age, setage] = useState("");
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [editid, seteditid] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const requestdata = {
      name,
      // time,
      // date,
      age
    }

    if (editid) {
      try {
        const response = await putwithheader(`update_upcoming_vaccination/${editid}`, requestdata, token);
        setData((prevData) =>
          prevData.map((item) =>
            item._id === editid ? response.data : item
          )
        );
        if (response && response.error == 0) {
          toast.success("Vaccination update successfully!");
          handleClear()
        } else {
          toast.error(response.message || "Failed to update Vaccination ")
        }
      } catch (error) {
        console.error('Error submitting:', error);
        alert("Failed to submit. Please try again.");
      }
    } else {
      try {
        const response = await postwithheader('upcoming_vaccination', requestdata, token);
        if (response && response.error == 0) {
          // Only update the UI if the API succeeds
          toast.success("Vaccination add successfully!");

          // setData((prevData) => [...prevData, response.data]);
          handleClear()
          fetchpetype();
        } else {
          toast.error(response.message || "Failed to add Vaccination ")
        }
      } catch (error) {
        console.error('Error submitting:', error);
        alert("Failed to submit. Please try again.");
      }
    }
  };

  const handleClear = () => {
    setname("")
    seteditid("")
    // setdate("")
    // settime("")
    setage("")
  }
  const fetchpetype = async () => {
    try {
      const response = await getwithheader('upcoming_vaccination');
      setData(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(`${error.message}`);
    }
  };
  const handledit = (id) => {
    seteditid(id);
    const found = data.find(item => item._id == id);
    if (found) {
      setname(found.name);
      // settime(found.time);
      setage(found.age);
      // setdate(moment(found.date).format('YYYY-MM-DD'));
    } else {
      console.error('Item not found');
    }
  }

  useEffect(() => {
    startTransition(fetchpetype);
  }, []);
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete?')) {
      try {

        const response = await deleteapi(`delete_upcoming_vaccination/${id}`);
        if (response && response.error === 0) {
          toast.success(response.message);
          fetchpetype();
        } else {
          console.error("Error deleting:", response.message);
          toast.error(response.message)
          alert("Failed to delete. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };
  return (
    <>
      {isPending && <Loader />}
      <Topnav />
      <section>
        <div className="container">
          <form onSubmit={handlesubmit}>
            <div className="grid grid-cols-4 mt-3 gap-3 items-center">
              <div className="col-span-1">
                <label className="block text-[#001B48] font-bold mb-2"> Name </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-[#001B48] font-bold mb-2"> Age <span className='text-red-500 text-sm'>(e.g., 1–13 years)</span></label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                  placeholder="Enter Age"
                  required
                />
              </div>
              {/* <div className="col-span-1">
                <label className="block text-[#001B48] font-bold mb-2"> Time </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => settime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                  placeholder="Enter Time"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="block text-[#001B48] font-bold mb-2">Date </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setdate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001B48]"
                  placeholder="Enter Date"
                  required
                />
              </div> */}
              <div className="col-span-1 mt-6">
                <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" disabled={isPending}>
                  {isPending ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
          <div className="grid grid-cols-1 mt-3">
            <table className="w-full border-separate border-spacing-y-1">
              <thead>
                <tr className="*:text-start *:text-nowrap *:text-sm *:font-bold bg-[#FAFAFA] *:px-[1rem] *:py-[1rem] *:tracking-[0.5px] *:border-r *:border-gray-100">
                  <th>Name</th>
                  <th>Age</th>
                  {/* <th>Date</th>
                  <th>Time</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id} className="*:text-start *:text-[13px] *:font-[400] bg-[#FFFFFF] *:px-[1rem] *:py-[0.5rem] *:tracking-[0.5px] *:border-r *:text-nowrap *:border-gray-100">
                    <td>{item?.name}</td>
                    <td>{item?.age}</td>
                    {/* <td>{moment(item?.date).format('DD-MM-YYYY')}</td>
                    <td>{item?.time}</td> */}
                    <td>
                      <div className="flex gap-3 item-center">
                        <button className="p-2 rounded-sm shadow text-[20px] text-[#001B48] hover:bg-[#001B48] hover:text-white" onClick={() => handledit(item._id)}>
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
  )
}

export default Upcomingrecords
