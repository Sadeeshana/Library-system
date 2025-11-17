function ModifyMember() {
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
    };

        e.preventDefault();
    };

    const handleCancel = () => {
    };

    return (
            <div className="modify-member-card">
                    <h2>Modify Member Details</h2>
                    <p>Update the information for an existing library member</p>


                    <div className="form-group">
                            <input
                                type="text"
                                name="memberId"
                                onChange={handleChange}
                            />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="fullName"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="emailAddress"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            name="phoneNumber"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <select
                            name="membershipType"
                            onChange={handleChange}
                        >
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="number"
                            name="membershipDuration"
                            onChange={handleChange}
                            min="1"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-button">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModifyMember;