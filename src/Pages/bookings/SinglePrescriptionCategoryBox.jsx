import PropTypes from "prop-types"

// import React from 'react'

const SinglePrescriptionCategoryBox = ({ itm, classname }) => {
    return (
        <>
            <div className={`w-full  p-2 ${classname}  rounded`}>

                <div className="w-full p-2">

                    <>
                        <table className='w-full table '>
                            <tr className=' *:p-2'>
                                {
                                    Object.entries(itm[0]).map(([ke, text]) => (
                                        <>
                                            <td key={text} style={{ border: "1px solid gray" }}>
                                                <label htmlFor="" style={{ fontSize: "16px;", fontWeight: "600" }}>{ke.replaceAll(new RegExp(`\\bEnter\\b`, 'g'), '').replace(/\s+/g, ' ').trim()}</label>
                                            </td>
                                        </>
                                    ))
                                }
                            </tr>
                            {
                                itm.map((item) => (
                                    <>
                                        <tr className=' *:p-2'>
                                            {
                                                Object.entries(item).map(([ke, text]) => (
                                                    <>
                                                        <td key={ke} style={{ border: "1px solid gray" }}>
                                                            <label htmlFor="" style={{ fontSize: "16px;" }}>{text}</label>
                                                        </td>


                                                    </>
                                                ))
                                            }
                                        </tr>

                                    </>
                                ))
                            }

                        </table>

                    </>

                </div>
            </div>
        </>
    )
}

export default SinglePrescriptionCategoryBox

SinglePrescriptionCategoryBox.propTypes = {
    itm: PropTypes.object,
    classname: PropTypes.string
}
