import React from 'react';
import './Members_page.css';

const MemberPage = () => {
    // Mock data matching the uploaded image
    const membersData = [
        { id: 1, name: 'Sopia clak', type: 'Premium', duration: '12 months', email: 'sopia12@gmail.com', status: 'Active' },
        { id: 2, name: 'Shen Shan', type: 'Standard', duration: '11 months', email: 'shen13@gmail.com', status: 'Active' },
        { id: 3, name: 'Soda clak', type: 'Premium', duration: '9 months', email: 'soda12@gmail.com', status: 'Active' },
        { id: 4, name: 'Johon Shen', type: 'Premium', duration: '8 months', email: 'Johon12@gmail.com', status: 'Active' },
        { id: 5, name: 'Sopia clak', type: 'Premium', duration: '12 months', email: 'sopia12@gmail.com', status: 'Active' },
        { id: 6, name: 'chinas clak', type: 'Premium', duration: '4 months', email: 'chinas12@gmail.com', status: 'Active' },
        { id: 7, name: 'Sopia Andrew', type: 'Premium', duration: '12 months', email: 'sopia12@gmail.com', status: 'Active' },
        { id: 8, name: 'Seman clak', type: 'Standard', duration: '12 months', email: 'Seman12@gmail.com', status: 'Active' },
    ];

    return (
        <div className="member-content">

            {/* Top Header with Title  */}
            <header className="page-header">
                <h1 className="page-title">Member</h1>

            </header>

            {/* Large Search Bar Area */}
            <div className="member-search-container">
                <div className="large-search-bar">
                    <span>🔍</span>
                    <input type="text" placeholder="Search Members" />
                </div>
            </div>

            {/* Data Table */}
            <div className="table-wrapper">
                <table className="member-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Membership Type</th>
                        <th>Membership Duration</th>
                        <th>content Details</th>
                        <th>Membership Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {membersData.map((member, index) => (
                        <tr key={index}>
                            <td>{member.name}</td>
                            <td>{member.type}</td>
                            <td>{member.duration}</td>
                            <td>{member.email}</td>
                            <td>
                                <button className="status-badge">{member.status}</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MemberPage;