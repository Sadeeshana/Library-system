import React, {useEffect, useState} from 'react';
import './Members_page.css';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import { motion } from 'framer-motion';

const MemberPage = () => {
    // Mock data matching the uploaded image, ensuring full names are included

        const [members, setMembers] = useState([]);


        const handleEdit = (id) => {
            console.log(`Editing book with ID: ${id}`);
            alert(`Placeholder: Editing book with ID: ${id}`);
        };

        const handleDelete = (id) => {
            if (window.confirm(`Are you sure you want to delete book ID ${id}?`)) {
                // Client-side delete for demo, replace with API call in production
                setMembers(members.filter(member => member.id !== id));
                console.log(`Book ID ${id} deleted.`);
            }
        };


        useEffect(() => {
            //Fetch the list from new api
            fetch('http://localhost:8080/api/members/all')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setMembers(data);
                })
                .catch(error => console.error(error));
        }, []);


        return (
            <div className="member-content">

                {/* Title - Matches the "Member" text in the image */}
                <h1 className="page-title-standalone">Member</h1>

                {/* Large Search Bar Area */}
                <div className="member-search-container">
                    {/* Re-using the existing 'large-search-bar' class, styled in CSS to match the image */}
                    <div className="large-search-bar">
                        <span>🔍</span>
                        <input type="text" placeholder="Search Members"/>
                    </div>
                </div>

                {/* Data Table */}
                <div className="table-wrapper">
                    <table className="member-table">
                        <thead>
                        <tr>
                            <th>Member ID</th>
                            <th>Member Name</th>
                            <th>Email</th>
                            <th>Phone number</th>
                            <th>Member Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.map((member, index) => (

                                <motion.tr key={member.memberId}
                                           initial={{opacity:0,y:0}}
                                           animate={{opacity:1,y:0}}
                                           transition={{duration:0.3,delay:index *0.1}}

                                >
                                <td>{member.memberId}</td>
                                <td>{member.memberName}</td>
                                <td>{member.memberEmail}</td>
                                <td>{member.memberPhoneNumber}</td>

                                <td>
                                    <button className="status-badge">{member.memberStatus}</button>
                                </td>
                                <td className="actions-cell">
                                    <FaPencilAlt
                                        className="action-icon edit-icon"
                                        onClick={() => handleEdit(member.memberId)}
                                        title="Edit"
                                    />
                                </td>

                                <td className="actions-cell">
                                    <FaTrashAlt
                                        className="action-icon delete-icon"
                                        onClick={() => handleDelete(member.memberId)}
                                        title="Delete"
                                    />
                                </td>
                                </motion.tr>



                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        );

};
export default MemberPage;