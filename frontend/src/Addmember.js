import React, { useState } from 'react';
import './Addmember.css';

function AddMemberModal({ isOpen, onClose, onMemberAdded }) {
    // 1. UPDATED STATE NAMES
    const [memberData, setMemberData] = useState({
        memberName: '',
        memberEmail: '',
        memberPhoneNumber: '',
        memberStatus: 'Active'
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setMemberData({ ...memberData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/members/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData)
            });

            if (response.ok) {
                alert("Member Added Successfully!");
                setTimeout(() => {
                    onMemberAdded();
                }, 10);
                onClose();

                // 2. UPDATED RESET STATE
                setMemberData({ memberName: '', memberEmail: '', memberPhoneNumber: '', memberStatus: 'Active' });
            } else {
                alert("Failed to add member.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server Error");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New Member</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <label>Member Name</label>
                    {/* 3. UPDATED INPUT NAMES (Must match State & Java) */}
                    <input
                        name="memberName"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        name="memberEmail"
                        type="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        name="memberPhoneNumber"
                        placeholder="Enter Phone Number"
                        onChange={handleChange}
                        required
                    />

                    <label>Member Status</label>
                    <select
                        name="memberStatus"
                        className="form-select"
                        value={memberData.memberStatus}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                    </select>

                    <button type="submit" className="save-btn">Save Member</button>
                </form>
            </div>
        </div>
    );
}

export default AddMemberModal;