import React, {useEffect, useState} from 'react';
import './Members_page.css';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import { motion } from 'framer-motion';
import AddMemberModal from "./Addmember";
import EditMemberModel from "./Editmember";

const MemberPage = () => {

        const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Edit member state variables
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const[selectedMember, setSelectedMember] = useState(null);

    const fetchMembers = () => {
        fetch('http://localhost:8080/api/members/all')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMembers(data);
                } else {
                    setMembers([]);
                }
            })
            .catch(error => console.error("Error fetching members:", error));
    };

    // Initial Load
    useEffect(() => {
        fetchMembers();
    }, []);


        const handleEdit = (member) => {
            setSelectedMember(member);
            setIsEditModalOpen(true);
        };

        const handleDelete =  async (id) => {
            if (window.confirm(`Are you sure you want to delete book ID ${id}?`)) {
               try {
                   const response = await fetch(`http://localhost:8080/api/members/delete/${id}`, {
                       method: 'DELETE',
                   });
                   if (response.ok) {
                       setMembers((prevMembers) => prevMembers.filter((member) => member.memberId !== id));
                       alert("Successfully deleted!");
                   } else {
                       alert("Error happened");
                   }

               }catch (error) {
                   console.log(error);
               }
            }
        };


        useEffect(() => {
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

                <h1 className="page-title-standalone">Member</h1>

                <div className="member-search-container">
                    <div className="large-search-bar">
                        <span>🔍</span>
                        <input type="text" placeholder="Search Members"/>
                    </div>
                </div>
                <div className="controls-container" style={{ marginBottom: '20px' }}>
                    <button
                        className="add-button"
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            backgroundColor: '#192A56',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}
                    >
                        + Add Member
                    </button>
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
                                        onClick={() => handleEdit(member)}
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
                <AddMemberModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onMemberAdded={fetchMembers}
                />
                <EditMemberModel
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onMemberUpdated={fetchMembers}
                memberToEdit={selectedMember}
                />

            </div>
        );

};
export default MemberPage;