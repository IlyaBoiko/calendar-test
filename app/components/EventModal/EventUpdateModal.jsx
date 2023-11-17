import React, { useState } from 'react';
import styles from './EventModal.module.css'

const EventUpdateModal = ({ isOpen, onClose, onUpdateEvent, eventData }) => {
    // State variables for handling edited event details
    const [editedTitle, setEditedTitle] = useState(eventData.title || "");
    const [editedDesc, setEditedDesc] = useState(eventData.desc || "");
    const [editedDate, setEditedDate] = useState(eventData.date || new Date());

    // Function to handle the event update
    const handleUpdate = () => {
        // Create an updated event object with edited details
        const updatedEvent = {
            ...eventData,
            title: editedTitle,
            desc: editedDesc,
            date: editedDate,
        };
        // Call the onUpdateEvent callback with the updated event
        onUpdateEvent(updatedEvent);
        // Close modal
        onClose();
    };

    return (
        <div className={`${isOpen ? "open" : ""} ${styles.modalEdit}`}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Edit Event</h2>
                <label className={styles.modalTitle_label}>Event Title:</label>
                <input
                    className={styles.modalInput}
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
                <label className={styles.modalDesc_label}>Event Desc:</label>
                <input
                    className={styles.modalInput}
                    type="text"
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                />
                <label className={styles.modalDate_label}>Event Date:</label>
                <input
                    className={styles.modalInput_date}
                    type="date"
                    value={editedDate.toISOString().split("T")[0]}
                    onChange={(e) => setEditedDate(new Date(e.target.value))}
                />
                <button className={styles.modalUpdate} onClick={handleUpdate}>
                    Update
                </button>
                <button className={styles.modalCancel} onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EventUpdateModal;
