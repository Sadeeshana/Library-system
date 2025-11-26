import React, { useState, useEffect } from 'react';
import './Member_management.css';

const MembersPage = () => {
    const [data, setData] = useState({
        stats: { total: 0, active: 0, inactive: 0 },
        members: []
    });

    useEffect(() => {
        // Simulating the fetch for immediate display
        // In production use: fetch('http://localhost:8080/api/members-list')
        setTimeout(() => {
            setData({
                stats: { total: 200, active: 150, inactive: 50 },
                members: [
                    { id: "M204", name: "Rose", borrowed: 8, joined: "2024/05/12", status: "Inactive" },
                    { id: "M300", name: "John", borrowed: 5, joined: "2024/09/03", status: "Active" },
                    { id: "M199", name: "Catherine", borrowed: 2, joined: "2025/06/25", status: "Active" },
                    { id: "M222", name: "Diana", borrowed: 0, joined: "2025/11/09", status: "Active" },
                ]
            });
        }, 300);
    }, []);

    return (
        <div className="members-page">
            {/* Header Strip */}
            <header className="top-header">
                <h2>Members</h2>
            </header>

            <div className="main-content">

                {/* Summary Stats Card */}
                <div className="stats-card">

                    {/* Row 1: Total */}
                    <div className="stat-row">
                        <div className="icon-box blue-icon">
                            {/* SVG for User Group */}
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                        </div>
                        <span className="stat-label">Total Members</span>
                        <span className="stat-value">{data.stats.total}</span>
                    </div>

                    {/* Row 2: Active */}
                    <div className="stat-row">
                        <div className="icon-box green-icon">
                            {/* SVG for Check Circle */}
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        </div>
                        <span className="stat-label">Active Members</span>
                        <span className="stat-value">{data.stats.active}</span>
                    </div>

                    {/* Row 3: Inactive */}
                    <div className="stat-row">
                        <div className="icon-box red-icon">
                            {/* SVG for X Circle */}
                            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                            </svg>
                        </div>
                        <span className="stat-label">Inactive Members</span>
                        <span className="stat-value">{data.stats.inactive}</span>
                    </div>
                </div>

                {/* Members Table */}
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Member ID</th>
                            <th>Member Name</th>
                            <th>Borrowed Books</th>
                            <th>Joined Date</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.members.map((member) => (
                            <tr key={member.id}>
                                <td><strong>{member.id}</strong></td>
                                <td><strong>{member.name}</strong></td>
                                <td><strong>{member.borrowed}</strong></td>
                                <td><strong>{member.joined}</strong></td>
                                <td className={member.status === 'Active' ? 'status-active' : 'status-inactive'}>
                                    {member.status}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Navigation */}
                <div className="next-page-link">
                    <span>Continue to Next page &rarr;</span>
                </div>

            </div>
        </div>
    );
};

export default MembersPage;