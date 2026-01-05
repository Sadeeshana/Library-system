import React, { useState } from 'react';
import './Report.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Reports() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [reportType, setReportType] = useState('Borrow return activity');

    const [userId, setUserId] = useState('');
    const [reportData, setReportData] = useState(null);

    const handleGeneratePDF = async () => {
        console.log("1. Button Clicked!");

        const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : "";

        let requestData = {};

        if (userId && userId.trim() !== "") {
            console.log("Specific User Mode Detected: " + userId);

            requestData = {
                type: "UserSpecific",
                userId: userId
            };

        } else {
            console.log("Standard Report Mode:", reportType);

            if (reportType === "Borrow return activity") {
                if (!startDate || !endDate) {
                    alert("Please select Start and End dates.");
                    return;
                }
            }

            requestData = {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                type: reportType
            };
        }

        console.log("2. Sending Data:", requestData);

        try {
            const response = await fetch('http://localhost:8080/api/reports/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;

                a.download = (userId && userId.trim() !== "")
                    ? `User_${userId}_Report.pdf`
                    : `${reportType}_Report.pdf`;

                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert("Failed. Check if User ID exists or Server logs.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server Error");
        }
    };

    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setReportType('Borrow return activity');
        setUserId('');
    };

    return (
        <div className="reports-container">
            <h2 className="reports-title">Library Reports</h2>

            <div className="filter-card">
                <h3 className="filter-card-title">Generate Report</h3>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="from-date">From Date:</label>
                        <DatePicker
                            id="from-date"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select start date"
                            className="date-picker"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="to-date">To Date:</label>
                        <DatePicker
                            id="to-date"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select end date"
                            className="date-picker"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Report Type:</label>
                        <select
                            className="form-select"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                        >
                            <option value="Borrow return activity">Borrow return activity</option>
                            <option value="Members">Members</option>
                            <option value="Books">Books</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Specific library member ID:</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter user ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
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