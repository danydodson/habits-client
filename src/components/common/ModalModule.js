import React from 'react'
import './ModalModule.css'


export default function ModalModule (props) {
    const { setIsOpen, modalHeadline } = props

    return (
        <>
            <div className="dark-background" onClick={() => setIsOpen(false)}></div>
            
            <div className="centered">
                <div className="modal">
                    <div className="modal-header">
                        <h3 id="h3-title" className="heading">{modalHeadline}</h3>
                    </div>

                    <button className="btn-close" onClick={() => setIsOpen(false)}>
                        <i className="fa-solid fa-xmark menue-icon"></i>
                    </button>

                    <div className="modal-content">
                        {props.children}
                    </div>

                </div>
            </div>
            
        </>
    )
}
