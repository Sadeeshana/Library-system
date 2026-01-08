import React, { useState, useEffect } from 'react';
import './Modify_member.css';

function ModifyMember() {
    const [formData, setFormData] = useState({
        memberId: '',
        fullName: '',
        emailAddress: '',
        phoneNumber: '',
        membershipType: 'Standard',
        membershipDuration: '',
    });

    useEffect(() => {
        const existingMemberData = {
            memberId: 'L001',
            fullName: 'Alice Smith',
            emailAddress: 'alice.smith@example.com',
            phoneNumber: '123-456-7890',
            membershipType: 'Premium',
            membershipDuration: 12,
        };
        setFormData(existingMemberData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log('Saving changes:', formData);
        alert('Changes saved successfully! Data sent to API (simulated).');
    };

    const handleCancel = () => {
        console.log('Operation cancelled.');
        alert('Modification cancelled.');
    };

    return (
        <div className="modify-member-page">
            <div className="modify-member-card">
                <div className="modify-member-header">
                    <h2>Modify Member Details</h2>
                    <p>Update the information for an existing library member</p>
                </div>

                <form onSubmit={handleSaveChanges} className="modify-member-form">

                    {/* Member ID */}
                    <div className="form-group">
                        <label htmlFor="memberId">Member ID</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                id="memberId"
                                name="memberId"
                                value={formData.memberId}
                                onChange={handleChange}
                                readOnly
                                className="read-only-input"
                            />
                            <span className="input-suffix">#</span>
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email Address */}
                    <div className="form-group">
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Membership Type */}
                    <div className="form-group">
                        <label htmlFor="membershipType">Membership Type</label>
                        <select
                            id="membershipType"
                            name="membershipType"
                            value={formData.membershipType}
                            onChange={handleChange}
                        >
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="membershipDuration">Membership duration (Months)</label>
                        <input
                            type="number"
                            id="membershipDuration"
                            name="membershipDuration"
                            value={formData.membershipDuration}
                            onChange={handleChange}
                            min="1"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="form-actions">
                        <button type="submit" className="save-button">Save Changes</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModifyMember;