// components/EventForm.js
import React, { useState, useEffect } from 'react';
import style from './Events.module.css';

const Event = ({ selectedDate, onAddEvent, onUpdateEvent, handleCloseModal }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(selectedDate || new Date());
    const [eventId, setEventId] = useState(null);

    // Update the date state when selectedDate changes
    useEffect(() => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    }, [selectedDate]);
    
    
    //Handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate title
        if (!title.trim()) {
            alert("Please enter a title.");
            return;
        }

        // Create a new event object
        const newEvent = {
            id: eventId || Date.now(),
            title,
            desc,
            date,
        };
        // Check if eventId is present to determine whether it's an update or addition
        if (eventId) {
            onUpdateEvent(newEvent);
        } else {
            onAddEvent(newEvent);
        }

        // Clear the form and close modal
        setTitle("");
        setDesc("");
        setDate(new Date());
        setEventId(null);
        handleCloseModal();
    };

    return (
        <div className={style.modal}>
            <form className={style.modalForm} onSubmit={handleSubmit}>
                <span onClick={handleCloseModal} className={style.modalClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        viewBox="0 0 50 50"
                    >
                        <path d="M 40.783203 7.2714844 A 2.0002 2.0002 0 0 0 39.386719 7.8867188 L 25.050781 22.222656 L 10.714844 7.8867188 A 2.0002 2.0002 0 0 0 9.2792969 7.2792969 A 2.0002 2.0002 0 0 0 7.8867188 10.714844 L 22.222656 25.050781 L 7.8867188 39.386719 A 2.0002 2.0002 0 1 0 10.714844 42.214844 L 25.050781 27.878906 L 39.386719 42.214844 A 2.0002 2.0002 0 1 0 42.214844 39.386719 L 27.878906 25.050781 L 42.214844 10.714844 A 2.0002 2.0002 0 0 0 40.783203 7.2714844 z"></path>
                    </svg>
                </span>
                <h3>{eventId ? "Update Event" : "Add Event"}</h3>
                <div>
                    <label>Title:</label>
                    <input
                        className={style.modalInput}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Desc:</label>
                    <input
                        className={style.modalInput}
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        className={style.modalInput_date}
                        type="date"
                        value={parsedDate(date)}
                        onChange={(e) => setDate(new Date(e.target.value))}
                    />
                </div>
                <button className={style.modalAdd} type="submit">
                    Add
                </button>
            </form>
        </div>
    );
};


const parsedDate = (originalDate) => {
  const updatedDate = new Date(originalDate);
  updatedDate.setHours(updatedDate.getHours() + 2);
  const updatedDateString = updatedDate.toISOString().split('T')[0];
  return updatedDateString;
};


export default Event;
