// import React from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Paginationbox = ({ page, pagination, setPage, }) => {
    return (
        <>
            <div className="inline-flex *:size-10 *:border *:border-[#001B48] gap-2  overflow-hidden    *:text-xs  *:flex *:items-center *:justify-center items-center">
                <button disabled={page == 1} onClick={() => setPage(1)}>First</button>
                <button disabled={page == 1} onClick={() => setPage(page - 1)}>
                    <FaChevronLeft />
                </button>
                <div className=" text-center leading-10">
                    <span className=' inline-block'>
                        {page}/{pagination?.totalPages}
                    </span>
                </div>
                <button disabled={page == pagination?.totalPages} onClick={() => setPage(page + 1)}>
                    <FaChevronRight />
                </button>
                <button disabled={pagination?.totalPages == page} onClick={() => setPage(pagination?.totalPages)}>
                    Last
                </button>
            </div>
        </>
    )
}

export default Paginationbox

Paginationbox.propTypes = {
    page: PropTypes.number,
    pagination: PropTypes.object,
    setPage: PropTypes.func
}
