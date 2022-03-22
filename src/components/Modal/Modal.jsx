import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Modal.css'
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isEventModal, setIsEventModal, createEvent, setCreateEvent, setAllEvents, allEvents }) => {
    const Modalref = useRef();
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
    const handleAddEvent = () => {
        setAllEvents([...allEvents, createEvent]);
    }
    return createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className='modal'
                ref={Modalref}>
                <div>
                    <h2>Add New Event</h2>
                    <div>
                        <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={createEvent.title} onChange={(e) => setCreateEvent({ ...createEvent, title: e.target.value })} />
                        <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={createEvent.start} onChange={(start) => setCreateEvent({ ...createEvent, start })} />
                        <DatePicker placeholderText="End Date" selected={createEvent.end} onChange={(end) => setCreateEvent({ ...createEvent, end })} />
                        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                            Add Event
                        </button>
                    </div>
                </div>
            </div>
        </>
        ,
        document.getElementById('modal')
    )
};

export default Modal