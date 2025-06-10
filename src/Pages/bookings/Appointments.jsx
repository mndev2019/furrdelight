import axios from 'axios';
import React from 'react'

// import AppointmentDetails from './AppointmentDetails';
import moment from 'moment';

import { Link } from 'react-router-dom';
import { baseUrl } from '../../Api/Baseurl';
import Topnav from '../../Component/Topnav';

const Appointments = () => {
    const [bookings, setBookings] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [pagination, setPagination] = React.useState({ perPage: 10, page: 1, totalPages: 1, totalDocs: 1 })
    const mtoken = localStorage.getItem("token");
    const getbookings = async () => {
        const resp = await axios.get(baseUrl + "booking", {
            headers: {
                Authorization: "Bearer " + mtoken
            },
            params: {
                page: page
            }
        });
        setBookings(resp.data.data);
        setPagination(resp.data.pagination)
    }
    React.useEffect(() => {
        getbookings();
    }, [page]);
    return (
        <>
           <Topnav />
            <section className='pt-4'>
                <div className="container">
                    <div className="grid grid-cols-12">
                        {/* <div className="col-span-12 mb-4">
                            <Paginationbox page={page} setPage={setPage} pagination={pagination} />
                        </div> */}
                        <div className="col-span-12">
                            <div className="w-full">
                                <table className="w-full">
                                    <thead>
                                        <tr className='*:text-xs *:text-start *:p-2 *:border *:border-gray-500'>
                                            <th>Sr No</th>
                                            <th>Doctor</th>
                                            <th>User</th>
                                            <th>Duration</th>
                                            <th>Booking Status</th>
                                            <th>Payment Status</th>
                                            <th>Appointment</th>
                                            <th>Mode</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bookings.map((itm, index) => (
                                                <>
                                                    <tr className='*:text-xs *:p-2 *:border *:border-gray-400'>
                                                        <td>
                                                            {(page - 1) * 10 + index + 1}
                                                        </td>
                                                        <td>
                                                            <div className="flex gap-1">
                                                                <div className="size-10">
                                                                    <img src={baseUrl + itm.doctor.profile_image} alt="" className="size-full" />
                                                                </div>
                                                                <div className="w-[calc(100%-2rem)]">
                                                                    <h4> {itm.doctor.name}</h4>
                                                                </div>
                                                            </div>

                                                        </td>
                                                        <td>
                                                            <ul>
                                                                <li>
                                                                    {itm.user.name}
                                                                </li>
                                                                <li>
                                                                    {itm.user.mobile}
                                                                </li>
                                                            </ul>

                                                        </td>
                                                        <td>
                                                            {itm.duration} minutes
                                                        </td>
                                                        <td>
                                                            {
                                                                itm.status == "booked" && (
                                                                    <>
                                                                        <span className="text-white bg-green-600 rounded px-5 inline-block py-1 text-xs">Booked</span>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                itm.status == "Cancelled" && (
                                                                    <>
                                                                        <span className="text-white bg-red-600 rounded px-5 inline-block py-1 text-xs">Cancelled</span>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                itm.status == "Completed" && (
                                                                    <>
                                                                        <span className="text-white bg-blue-600 rounded px-5 inline-block py-1 text-xs">Completed</span>
                                                                    </>
                                                                )
                                                            }
                                                        </td>
                                                        <td>
                                                            <ul>
                                                                <li>
                                                                    Order Id : {itm.order_id}
                                                                </li>
                                                                <li>
                                                                    status : {itm.payment_status}
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <ul>
                                                                <li>Appointment Date : {moment(itm.booking_date).format('DD-MM-YYYY')}</li>
                                                                <li>Start At : {moment(itm.start_at).format('hh:mm A')}</li>
                                                                <li>End At : {moment(itm.end_at).format('hh:mm A')}</li>
                                                            </ul>


                                                        </td>
                                                        <td>
                                                            {itm.mode}
                                                        </td>
                                                        <td>
                                                            <Link to={'/prescription/show/' + itm._id} className='px-2 inline-block text-nowrap text-xs py-1 bg-[#001B48] rounded text-white'>View Prescription</Link>
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
                </div>
            </section>
        </>
    )
}

export default Appointments
