import React, { useState, useMemo, useEffect } from 'react'
import { tableData } from '../../utils/data'
import { dateFormat } from '../../utils/utils'
import Modal from '../Modal'
import Pagination from '../Paginator'
import Table from '../Table/Table'
import './index.css'

let PageSize = 15;

export default function Home() {

  const [isInfinite, setisInfinite] = useState(false)

  useEffect(() => {
    if(isInfinite){
      const TableEl = document.getElementById('product-table');
      TableEl.addEventListener("scroll", scrollBottom);
      
    return () => {
      TableEl.removeEventListener("scroll", scrollBottom);
    };
  }
  });

  const scrollBottom = () => {
      const wrappedElement = document.getElementById('product-table');
      if (parseInt(wrappedElement.scrollHeight - wrappedElement.scrollTop, 10) === parseInt(wrappedElement.clientHeight, 10)) {
        setCurrentPage(page => page + 1 )
        const firstPageIndex = (currentPage) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const newData = Data.slice(firstPageIndex, lastPageIndex);
        setinfiniteTableData([...infiniteTableData , ...newData])
      }
  }

    const [Visible, setVisible] = useState(false)
    const [selectedData, setSelectedData] = useState()
    const [Data, setData] = useState(tableData)

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return Data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, Data]);

    const [infiniteTableData, setinfiniteTableData] = useState(currentTableData)

    const handleSearch = (value) => {
        const newData = tableData.filter(data => data.id.includes(value));
        setCurrentPage(1)
        setData(newData)
        setinfiniteTableData(newData)
    }

    const closeModal = () => {
        setVisible(false)
        setSelectedData()
    }

    const Columns = [
      {
        key: 'id',
        title: 'ID',
        onclick: (data) => {
            setVisible(visible => !visible);
            setSelectedData(data)
        }
      },
      {
        key: 'amount',
        title: 'Amount',
      },
      {
        key: 'biiling_period',
        title: 'Time Period',
        render: (data) => {
          const date = data.biiling_period.split('-')
          return <div>{date[1]}</div>
        } 
      },
      {
        key: 'credits_used',
        title: 'Credits Used',
        render: (data) => <div>{data.credits_used} / {data.credits_limit}</div>
      },
      {
        key: 'invoice_payment_status',
        title: 'Status',
        render: (data) => <span className="payment-status">{data.invoice_payment_status === "Unpaid"? "Not Paid" : data.invoice_payment_status}</span>
      },
      {
        key: '',
        title: '',
        render: () => <button className="btn-receipt">Receipt</button>
      },
    ]

    const handleUpdateItem = (e) => {
      e.preventDefault();
      const formData = {
        id: e.target['id'].value,
        amount: e.target['amount'].value,
        biiling_period: `${new Date(e.target['biiling_period'].value).toDateString()} - ${new Date(e.target['biiling_period'].value).toDateString()}`,
        credits_used: e.target['credits_used'].value,
        invoice_payment_status: e.target['invoice_payment_status'].value
      } 

      const updatedData = Data.map(x => (x.id === formData.id ? { ...formData } : x));
      setData(updatedData)
      setSelectedData()
      closeModal()
    }


    return (
        <div className="table-container">
            <Table
            title="Invoices"
             Data={isInfinite ? infiniteTableData : currentTableData} 
             Columns={Columns} 
             handleSearch={handleSearch} 
             scrollY={{maxHeight: 'calc(100vh - 350px)'}}
             togglePagination={() => {
               setisInfinite(value => {
                 if(value){
                  setCurrentPage(1)
                   return !value
                 }else{
                  setCurrentPage(1)
                  return !value
                 }
               });
             }}
             isInfinite={isInfinite}
           />
            {!isInfinite &&<Pagination
             className="pagination-bar"
             currentPage={currentPage}
             totalCount={Data.length}
             pageSize={PageSize}
             onPageChange={page => setCurrentPage(page)}
            />}
            <Modal
             Visible={Visible}
             title={selectedData?.id}
             handleClose={closeModal}
             width="50%"
            >
                <div>
                    {selectedData &&
                      <div className="invoice-item-form">
                        <form onSubmit={handleUpdateItem}>
                          <label>Id</label> <br />
                          <input type="text" readOnly className="invoice-input" id="id" name="id" value={selectedData?.id} /> <br />
                          <label>Amount</label> <br />
                          <input type="number" className="invoice-input" id="amount" name="amount" defaultValue={selectedData?.amount} /><br />
                          <label>Date</label> <br />
                          <input type="date" className="invoice-input" id="biiling_period" name="biiling_period" defaultValue={dateFormat(selectedData?.biiling_period)} /><br />
                          <label>Credit Used</label> <br />
                          <input type="number" className="invoice-input" id="credits_used" name="credits_used" defaultValue={selectedData?.credits_used} /><br />
                          <input type="radio" id="paid" name="invoice_payment_status" value="Paid" defaultChecked={selectedData?.invoice_payment_status === 'Paid'} />
                          <label htmlFor="paid" className="radio-label">Paid</label>
                          <input type="radio" id="unpaid" name="invoice_payment_status" value="Unpaid" defaultChecked={selectedData?.invoice_payment_status === 'Unpaid'} />
                          <label htmlFor="unpaid" className="radio-label">Unpaid</label> <br/><br/>
                          <div style={{display: 'flex', justifyContent: 'right'}}>
                            <input type="button" className="btn-cancel" onClick={closeModal} value="Cancel" />
                            <input type="submit" className="btn-update" value="Update Details" />
                          </div>
                        </form>
                      </div>
                    }
                </div>
            </Modal>
        </div>
    )
}
