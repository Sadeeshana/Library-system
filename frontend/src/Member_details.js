import React, { useState, useEffect } from 'react';
import './Member_details.css'; // Import the CSS file below

const MemberDetails = () => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, fetch from: http://localhost:8080/api/members/54854
        // For this demo, we will simulate the fetch so you can see the UI immediately.
        const fetchData = async () => {
            try {
                // Simulate API delay
                setTimeout(() => {
                    const mockData = {
                        profile: {
                            fullName: "Sopia Jems",
                            memberId: "54854",
                            status: "Active",
                            dob: "1990-12-07",
                            gender: "Female",
                            address: "123 Okara,geltown",
                            phone: "+1 (222) 254-2541",
                            email: "Sopia125@gmail.com",
                            membershipType: "Premium",
                            startDate: "2026-01-01",
                            endDate: "2026-03-01",
                            membershipStatus: "Active"
                        },
                        history: Array(5).fill({
                            title: "The Secret Garden",
                            author: "Frances Hodgson",
                            borrowedDate: "2026-01-06",
                            dueDate: "2026-01-30",
                            returnedDate: "2026-01-29",
                            status: "Return"
                        })
                    };
                    setMember(mockData);
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error("Error fetching member data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading Member Details...</div>;
    if (!member) return <div>No data found</div>;

    return (
        <div className="page-container">
            <header className="page-header">
                <h1>Member Details</h1>
                <p>View and manage member details</p>
            </header>

            {/* Top Profile Card */}
            <div className="profile-card">
                <div className="profile-info">
                    <div className="avatar-circle">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sopia" alt="Avatar" />
                    </div>
                    <div className="profile-text">
                        <h2>{member.profile.fullName}</h2>
                        <p className="member-id">Member ID : {member.profile.memberId}</p>
                        <p className="status-text">{member.profile.status}</p>
                    </div>
                </div>
                <button className="edit-btn">Edit</button>
            </div>

            {/* Main Content Grid */}
            <div className="content-grid">

                {/* Left Column: Details */}
                <div className="left-column">

                    <section className="details-section">
                        <h3>Personal Details</h3>
                        <div className="details-grid">
                            <div className="detail-item">
                                <label>Full Name</label>
                                <div className="value">{member.profile.fullName}</div>
                            </div>
                            <div className="detail-item">
                                <label>Date of Birth</label>
                                <div className="value">{member.profile.dob}</div>
                            </div>
                            <div className="detail-item">
                                <label>Gender</label>
                                <div className="value">{member.profile.gender}</div>
                            </div>
                            <div className="detail-item">
                                <label>Address</label>
                                <div className="value">{member.profile.address}</div>
                            </div>
                            <div className="detail-item">
                                <label>Phone Number</label>
                                <div className="value">{member.profile.phone}</div>
                            </div>
                            <div className="detail-item">
                                <label>Email</label>
                                <div className="value email-text">{member.profile.email}</div>
                            </div>
                        </div>
                    </section>

                    <section className="details-section mt-large">
                        <h3>Membership Details</h3>
                        <div className="details-grid">
                            <div className="detail-item">
                                <label>Membership Type</label>
                                <div className="value">{member.profile.membershipType}</div>
                            </div>
                            <div className="detail-item">
                                <label>Start Date</label>
                                <div className="value">{member.profile.startDate}</div>
                            </div>
                            <div className="detail-item">
                                <label>End Date</label>
                                <div className="value">{member.profile.endDate}</div>
                            </div>
                            <div className="detail-item">
                                <label>Status</label>
                                <div className="value">{member.profile.membershipStatus}</div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Table */}
                <div className="right-column">
                    <div className="table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>Author Data</th>
                                <th>Borrowed Data</th>
                                <th>Due Data</th>
                                <th>Returned</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {member.history.map((book, index) => (
                                <tr key={index}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.borrowedDate}</td>
                                    <td>{book.dueDate}</td>
                                    <td>{book.returnedDate}</td>
                                    <td>
                                        <span className="status-badge">{book.status}</span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;