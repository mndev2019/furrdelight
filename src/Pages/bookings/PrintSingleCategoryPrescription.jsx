import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';




import { baseUrl } from '../../Api/Baseurl';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import SinglePrescriptionCategoryBox from './SinglePrescriptionCategoryBox';

const PrintSingleCategoryPrescription = () => {
    const navigate = useNavigate();
    const printRef = useRef();
    const { id, print_only } = useParams();

    const [pitems, setPitems] = React.useState([]);
    const mtoken = localStorage.getItem("token");
    const getcategoriesData = async () => {
        try {
            const resp = await axios.get(baseUrl + "prescription/print", {
                headers: {
                    Authorization: 'Bearer ' + mtoken
                },
                params: {
                    booking_id: id,
                    print_only: print_only
                }
            });
            setPitems(resp.data.data);

        } catch (err) {
            console.log(err);
        }
    }
    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "letter"); // Changed "a4" to "letter"
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("prescription.pdf");
    };

    React.useEffect(() => {
        getcategoriesData();
    }, []);
    const gotoback = () => {
        navigate(-1);
    }
    return (
        <>
            <section>
                <div className="container">
                    <div className="w-full text-end flex gap-4 justify-end mt-4">
                        <button type="submit" className="py-2 px-4 rounded text-white bg-[#001B48]" onClick={gotoback}>
                            Back
                        </button>
                        <button onClick={handleDownloadPdf} className='bg-[var(--primary)] px-4 py-2 text-black text-lg'> Print</button>
                    </div>
                </div>
            </section>
            <section ref={printRef}>
                <div className="container mx-auto max-w-[500px]" style={{}} >
                    <div className="grid grid-cols-12">
                        {
                            pitems.map((itm) => (
                                <>
                                    <div className="col-span-12">
                                        <h4 className='text-sm font-bold tracking-wider w-full  rounded-lg   p-2'>{itm.category.title}</h4>
                                        <SinglePrescriptionCategoryBox itm={itm.text} />
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

export default PrintSingleCategoryPrescription
