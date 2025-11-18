import React, { useState } from "react";
import "./Modify_member.css";

// Member Details
function ModifyMember() {
    const [memberDetails, setMemberDetails] = useState({
        memberId: "",
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        membershipType: "",
        membershipDuration: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMemberDetails({
            ...memberDetails,
            [name]: value,
        });
    };

    // Validation
    const validate = () => {
        let newErrors = {};
        if (!memberDetails.memberId.trim()) newErrors.memberId = "Member ID required";
        if (!memberDetails.fullName.trim()) newErrors.fullName = "Full name required";
        if (!memberDetails.emailAddress.includes("@")) newErrors.emailAddress = "Invalid email";
        if (memberDetails.phoneNumber.length < 10)
            newErrors.phoneNumber = "Phone number must be at least 10 digits";
        if (!memberDetails.membershipType) newErrors.membershipType = "Select membership type";
        if (!memberDetails.membershipDuration) newErrors.membershipDuration = "Enter duration";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Save
    const handleSave = (e) => {
        e.preventDefault();
        if (!validate()) return;

        setMessage("Member details saved successfully!");
        console.log("Saved member details:", memberDetails);
    };

    // Handle Cancel/Reset
    const handleCancel = () => {
        setMemberDetails({
            memberId: "",
            fullName: "",
            emailAddress: "",
            phoneNumber: "",
            membershipType: "",
            membershipDuration: "",
        });
        setErrors({});
        setMessage("");
    };

    return (
        <div className="modify-member-container">
            <div className="modify-member-card">
                <h2>Modify Member Details</h2>
                <p>Update the information for an existing library member</p>

                {message && <div className="form-message">{message}</div>}

                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <label>Member ID</label>
                        <input
                            type="text"
                            name="memberId"
                            value={memberDetails.memberId}
                            onChange={handleChange}
                        />
                        {errors.memberId && <span className="error">{errors.memberId}</span>}
                    </div>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={memberDetails.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="emailAddress"
                            value={memberDetails.emailAddress}
                            onChange={handleChange}
                        />
                        {errors.emailAddress && <span className="error">{errors.emailAddress}</span>}
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={memberDetails.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                    </div>

                    <div className="form-group">
                        <label>Membership Type</label>
                        <select
                            name="membershipType"
                            value={memberDetails.membershipType}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>Select type</option>
                            <option value="standard">Standard</option>
                            <option value="premium">Premium</option>
                            <option value="student">Student</option>
                        </select>
                        {errors.membershipType && <span className="error">{errors.membershipType}</span>}
                    </div>

                    <div className="form-group">
                        <label>Membership Duration (Months)</label>
                        <input
                            type="number"
                            name="membershipDuration"
                            value={memberDetails.membershipDuration}
                            onChange={handleChange}
                            min="1"
                        />
                        {errors.membershipDuration && (
                            <span className="error">{errors.membershipDuration}</span>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-button">Save Changes</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModifyMember;