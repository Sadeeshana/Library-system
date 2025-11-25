
import React, { useState } from 'react';

import './Report.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Reports() {



    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [borrowerType, setBorrowerType] = useState('All');
    const [userId, setUserId] = useState('');




    const handleGeneratePDF = () => {

        console.log("--- Generating Report ---");
        console.log("From Date:", startDate);
        console.log("To Date:", endDate);
        console.log("Borrower Type:", borrowerType);
        console.log("User ID:", userId);
    };

    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setBorrowerType('All');
        setUserId('');
    };


    return (
        <div className="reports-container">

            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search Book Name or ID"
                    className="search-bar"
                />
            </div>

            <h2 className="reports-title">Reports of Overdue Books</h2>

            <div className="filter-card">
                <h3 className="filter-card-title">Overdue Books List</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="from-date">From Date:</label>

                        <DatePicker
                            id="from-date"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                            className="date-picker"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="to-date">To Date:</label>
                        <DatePicker
                            id="to-date"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)} // We call 'setEndDate' to update this state.
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                            className="date-picker"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="borrower-type">Borrower Type:</label>
                        <select
                            id="borrower-type"
                            className="form-select"
                            value={borrowerType} // We 'bind' the value to our 'borrowerType' state.
                            onChange={(e) => setBorrowerType(e.target.value)} // When it changes, we update the state.
                        >
                            <option value="All">All</option>
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="user-id">Specific User ID: (optional)</label>
                        <input
                            type="text"
                            id="user-id"
                            className="form-input"
                            placeholder="Enter user ID:"
                            value={userId} // We bind the value to our 'userId' state.
                            onChange={(e) => setUserId(e.target.value)} // When the user types, we update the state.
                        />
                    </div>
                </div>

                <div className="button-container">
                    <button className="pdf-button" onClick={handleGeneratePDF}>
                        Generate PDF
                    </button>
                    <button className="clear-button" onClick={handleClearFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Reports;