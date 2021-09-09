import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import './index.css'

export default function Table({ title, Data, Columns, handleSearch, scrollY, togglePagination, isInfinite }) {

  const [sortAsc, setsortAsc] = useState(true)

    const sortCol = (key) => {
      Data.sort((a,b) => {
        if(sortAsc){
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
        }else{
          if (a[key] > b[key]) return -1;
          if (a[key] < b[key]) return 1;
        }
        return 0;
      })
    }

    return (
        <div>
            <div className="table-header">
              <h2 className="no-margin">{title}</h2>
              <div>
                <span className="search">
                  <input
                   type="text"
                   className="search-input"
                   onKeyUp={(e) => handleSearch(e.target.value)} 
                   placeholder="Search"
                  />
                </span>
                <button className={isInfinite ? 'toggle-btn active' : 'toggle-btn'} onClick={togglePagination}>{isInfinite ? 'Infinite' : 'Limit Offset'}</button>
              </div>
            </div>
            <table className="table-style scrolldown">  
                <thead>
                  <tr style={{backgroundColor: '#ecf2f9', textAlign: 'left'}}>
                      {Columns.map((col, i) => (
                          <th
                           key={i}
                           className="header-item"
                           onClick={() => {
                            sortCol(col.key)
                            setsortAsc(isSort => !isSort)
                          }}
                          >
                            {col.title}
                          </th>
                      ))}                
                  </tr> 
                </thead>
                <tbody style={{overflowY:'scroll', maxHeight: scrollY.maxHeight}} id="product-table">        
                {Data.map((data, index) => (
                      <tr key={index}>
                          {Columns.map((col, i) => (                           
                              <td
                                key={i}
                                onClick={() => col.onclick ? col.onclick(data) : {}}
                                className={ col.onclick ? 'item-col item-clickable' : 'item-col'}
                                >
                                {col.render ?   col.render(data) : data[`${col.key}`]}
                              </td>
                          ))}
                      </tr>
                ))}     
                </tbody>     
            </table> 
        </div>
    )
}


Table.propTypes = {
  title: PropTypes.string,
  Data: PropTypes.array, 
  Columns: PropTypes.array, 
  handleSearch: PropTypes.func, 
  scrollY: PropTypes.object, 
  togglePagination: PropTypes.func, 
  isInfinite: PropTypes.bool
};