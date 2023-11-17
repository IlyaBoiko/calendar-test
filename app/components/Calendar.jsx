"use client";

import React, { useState, useEffect } from "react";
import Event from "./Events/Events";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventUpdateModal from "./EventModal/EventUpdateModal";

// convert a date string to a Date object
const convertDateStringToDate = (dateString) => {
	return new Date(dateString);
};

const Calendar = () => {
    // State for managing current date, events, selected date, and modal visibility
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with a valid Date object
    const [isFirstRender, setFirstRender] = useState(false);

    // State for handling modal visibility and data
    const [isEventOpen, setEventOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // Function to open the modal with specific event data
    const openModal = (event) => {
        setModalData(event);
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalData(null);
        setModalOpen(false);
    };

    useEffect(() => {
        // Load events from local storage
        const storedEvents = JSON.parse(
            localStorage.getItem("events"),
            (key, value) => {
                // Check if the value is a string and matches the date format
                if (
                    typeof value === "string" &&
                    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)
                ) {
                    return convertDateStringToDate(value);
                }
                return value;
            }
        );

        if (storedEvents) setEvents(storedEvents);
    }, []);

    useEffect(() => {
        // Save events to local storage whenever events change
        if (isFirstRender) {
            localStorage.setItem("events", JSON.stringify(events));
        }
        setFirstRender(true);
    }, [events]);

    // Helper functions for date manipulation
    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    const getDaysArray = (date) => {
        const totalDays = daysInMonth(date);
        const daysArray = [];

        for (let day = 1; day <= totalDays; day++) {
            daysArray.push(new Date(date.getFullYear(), date.getMonth(), day));
        }

        return daysArray;
    };

    // Function to add a new event
    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    // Function to close the event modal
    const handleCloseModal = () => {
        setEventOpen(false);
    };

    // Function to update an existing event
    const handleUpdateEvent = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        );
    };
    // Function to delete an event
    const handleDeleteEvent = (eventId) => {
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
        );
    };

    // Function to render events for a specific date
    const renderEventsForDate = (date) => {
        const eventsForDate = events.filter((event) => {
            if (event.date instanceof Date) {
                return (
                    event.date.getFullYear() === date.getFullYear() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getDate() === date.getDate()
                );
            } else {
                return false;
            }
        });

        return eventsForDate.map((event) => (
            <div key={event.id} className="event">
                <p className="event-title">{event.title}</p>
                <p className="event-desc">{event.desc}</p>
                <p className="event-date">{event.date.toDateString()} </p>
                <button className="event-edit" onClick={() => openModal(event)}>
                    Edit
                </button>{" "}
                <button
                    className="event-delete"
                    onClick={() => handleDeleteEvent(event.id)}
                >
                    Delete
                </button>
            </div>
        ));
    };

    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Functions to handle moving to the next/prev month
    const handlePrevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };
    // Array of days for the current month
    const daysArray = getDaysArray(startOfMonth(currentDate));

    return (
        <div className="container">
            <div className="filters">
                <div>
                    <label>
                        Select Month and Year:{" "}
                        <DatePicker
                            selected={currentDate}
                            onChange={(date) => setCurrentDate(date)}
                            dateFormat="MMMM yyyy"
                            showMonthYearPicker
                            customInput={
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 48 48"
                                    >
                                        <mask id="ipSApplication0">
                                            <g
                                                fill="none"
                                                stroke="#fff"
                                                strokeLinejoin="round"
                                                strokeWidth="4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    d="M40.04 22v20h-32V22"
                                                ></path>
                                                <path
                                                    fill="#fff"
                                                    d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                                ></path>
                                            </g>
                                        </mask>
                                        <path
                                            fill="currentColor"
                                            d="M0 0h48v48H0z"
                                            mask="url(#ipSApplication0)"
                                        ></path>
                                    </svg>
                                </button>
                            }
                        />
                    </label>
                </div>
            </div>
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={handlePrevMonth}>&lt;</button>
                    <h3 className="calendar-title">
                        {new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            year: "numeric",
                        }).format(currentDate)}
                    </h3>
                    <button onClick={handleNextMonth}>&gt;</button>
                </div>
                <div className="calendar-days">
                    {daysArray.map((date, index) => (
                        <div
                            key={index}
                            className={`calendar-day ${
                                selectedDate &&
                                selectedDate.toDateString() ===
                                    date.toDateString()
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => setSelectedDate(date)}
                        >
                            <div className="day-number">
                                <p>{date.getDate()}</p>
                                <p>{dayNames[date.getDay()]}</p>
                            </div>
                            <div className="events-container">
                                {renderEventsForDate(date)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="event-open" onClick={() => setEventOpen(true)}>
                Add Event
            </button>
            {isEventOpen && (
                <Event
                    isOpen={isEventOpen}
                    selectedDate={selectedDate}
                    onAddEvent={handleAddEvent}
                    handleCloseModal={handleCloseModal}
                    onUpdateEvent={handleUpdateEvent}
                />
            )}

            {isModalOpen && (
                <EventUpdateModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onUpdateEvent={handleUpdateEvent}
                    eventData={modalData}
                />
            )}
        </div>
    );
};

export default Calendar;
