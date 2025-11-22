import React from "react";
import "./librarian_register.css";

function LibrarianRegister() {
    return (
        <div className="container">

            <div className="left-section">
                <img src="/library-image.png" className="side-img" alt="Library" />
            </div>

            <div className="right-section">
                <h2>Librarian Register</h2>

                <form className="form">

                    <label>Librarian ID</label>
                    <input type="text" placeholder="Enter your ID" />

                    <label>NIC</label>
                    <input type="text" placeholder="Enter your NIC" />

                    <label>E-mail</label>
                    <input type="email" placeholder="Enter your E-mail" />

                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter your Phone Number" />

                    <label>Username</label>
                    <input type="text" placeholder="Enter Username" />

                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" />

                    <button className="register-btn">Register</button>
                </form>

            </div>
        </div>
    );
}

export default LibrarianRegister;
