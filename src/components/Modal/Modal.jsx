import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './Modal.css'
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isEventModal, setIsEventModal, createNewEvent, setCreateNewEvent, setAllEvents, allEvents }) => {
    const Modalref = useRef();
    const [errorTitle, setErrorTitle] = useState('')
    const [errorDate, setErrorDate] = useState('')

    const AddNewEvent = () => {
        if (createNewEvent.title && createNewEvent.start != '') {
            setAllEvents([...allEvents, createNewEvent]);
            setIsEventModal(false)
            setErrorTitle('')
            setErrorDate('')
            setCreateNewEvent({ title: "", start: "", end: "" })
        } else if (createNewEvent.title === '') {
            setErrorTitle('Please add a title')
            setErrorDate('')
        } else if (createNewEvent.start === '') {
            setErrorDate('Please choose a date')
            setErrorTitle('')
        }
    }

    useEffect(() => {
        const checkIfClickedOutsideModal = (e) => {
            if (isEventModal && Modalref.current && !Modalref.current.contains(e.target)) {
                if (isEventModal) {
                    setIsEventModal(false)
                }
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutsideModal)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutsideModal)
        };
    }, [isEventModal, setIsEventModal])

    if (!isEventModal) {
        return null;
    }

    return createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className='modal'
                ref={Modalref}>
                <div className='modal-wrapper'>
                    <h2>Add New Event</h2>
                    <div className='modal-input-wrapper'>
                        <input type="text" placeholder="Add Title"
                            value={createNewEvent.title}
                            onChange={(e) => setCreateNewEvent({ ...createNewEvent, title: e.target.value })} />
                        <p>{errorTitle && errorTitle}</p>
                        <DatePicker placeholderText="Pick a date" style={{ width: "60%", marginBottom: "10px" }}
                            selected={createNewEvent.start}
                            onChange={(start) => setCreateNewEvent({ ...createNewEvent, start: start, end: start })} />
                        <p>{errorDate && errorDate}</p>
                        <button
                            onClick={AddNewEvent}
                            className="button-submit" role="button">+Add Event</button>
                    </div>
                </div>
            </div>
        </>
        ,
        document.getElementById('modal')
    )
};

export default Modal