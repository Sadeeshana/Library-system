import React, { useState, useEffect } from 'react';
import './Editmember.css';

function EditMemberModal({ isOpen, onClose, onMemberUpdated, memberToEdit }) {

    const [memberData, setMemberData] = useState({
        memberName: '',
        memberEmail: '',
        memberPhoneNumber: '',
        memberStatus: 'Active'
    });

    useEffect(() => {
        if (isOpen && memberToEdit) {
            setMemberData({
                memberName: memberToEdit.memberName || '',
                memberEmail: memberToEdit.memberEmail || '',
                memberPhoneNumber: memberToEdit.memberPhoneNumber || '',
                memberStatus: memberToEdit.memberStatus || 'Active'
            });
        }
    }, [isOpen, memberToEdit]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setMemberData({ ...memberData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/members/update/${memberToEdit.memberId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData)
            });

            if (response.ok) {
                alert("Member Updated Successfully!");
                onMemberUpdated();
                onClose();
            } else {
                alert("Failed to update member.");
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
                    <h2>Edit Member</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <label>Member Name</label>
                    <input
                        name="memberName"
                        value={memberData.memberName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        name="memberEmail"
                        type="email"
                        value={memberData.memberEmail}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        name="memberPhoneNumber"
                        value={memberData.memberPhoneNumber}
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

                    <button type="submit" className="save-btn">Update Member</button>
                </form>
            </div>
        </div>
    );
}

export default EditMemberModal;