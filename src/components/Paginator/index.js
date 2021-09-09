import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { usePagination } from '../../hook/usePagination';
import './index.css';

export default function Pagination(props) {
    const [page, setpage] = useState()
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
      } = props;

      const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
      });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    return (
        <div className="pagination-container">
        <ul className='pagination-container'>
            {paginationRange.map((pageNumber, index) => {
                return (
                <li
                    key={index}
                    className={`pagination-item ${currentPage === pageNumber ? 'active': ''}`}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </li>
                );
            })}
        </ul>
        <div className="goto-container">
            <span className="goto-text">Go to page</span>
            <input
             id="number"
             className="goto-input" 
             type="number"
             onChange={e => {
                    const el = e.target || e
                    if(el.type === "number" && el.max && el.min ){
                      let value = parseInt(el.value)
                      el.value = value // for 000 like input cleanup to 0
                      let max = parseInt(el.max)
                      let min = parseInt(el.min)
                      if ( value > max ) el.value = el.max
                      if ( value < min ) el.value = el.min
                    }
                    setpage(e.target.value)
            }}
             max={paginationRange.length}
             min="1" />
            <button
             onClick={() => onPageChange(parseInt(page, 10))}
             className="btn-go"
            >
                 Go
            </button>
        </div>
        </div>
    )
}


Pagination.propTypes = {
    totalCount: PropTypes.number,
    siblingCount: PropTypes.number, 
    currentPage: PropTypes.number, 
    pageSize: PropTypes.number,  
    onPageChange: PropTypes.func, 
  };
