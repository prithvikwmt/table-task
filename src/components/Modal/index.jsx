import React from 'react'
import PropTypes from 'prop-types';
import './index.css'

export default function Modal({ Visible, handleClose, width = '80%', title = 'Modal Title',children }) {
    return (
        <div className="modal" style={{ display: Visible ? 'block': 'none' }}>
            <div>
                <div className="modal-container" style={{width}}>
                    <div className="modal-header">
                        <div className="modal-title">{title}</div>
                    </div>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}


Modal.propTypes = {
    title: PropTypes.string,
    width: PropTypes.string, 
    children: PropTypes.element,   
    handleClose: PropTypes.func, 
    Visible: PropTypes.bool
  };