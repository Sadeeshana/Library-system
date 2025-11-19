import React from "react";
import './Sidebar.css';//Insert the css file
import DashIcon from './Dash.json';
import Book from './Book.json';
import borrow from './borrow.json';
import reports from './Report.json';
import Member from './Member.json';
import logout from './logout.json';
import Lottie from "lottie-react";

//Start main sidebar
function Sidebar(){
    return(
        <div className="Sidebar">
            {/*Logo*/}
            <div className="Sidebarhead">
                <h1 className="Sidebarlogo">BookNest</h1>
                <p className="Sidebar-sub">
                    LIBRARY MANAGEMENT SYSTEM
                </p>

            </div>

            {/*Links Section*/}
            <ul className="nav-list">
                <li className="nav-item active">
                    <a href="">
                    <Lottie animationData={DashIcon} className="nav-icon"/>
                        Dashboard
                    </a>

                </li>
                <li className="nav-item">
                    <a href="">
                        <Lottie animationData={Book} className="nav-icon"/>
                        Books</a>
                </li>
                <li className="nav-item">
                    <a href="">
                        <Lottie animationData={Member} className="nav-icon"/>
                        Member</a>
                </li>
                <li className="nav-item">
                    <a href="">
                        <Lottie animationData={borrow} className="nav-icon"/>
                        Borrow</a>
                </li>
                <li className="nav-item">
                    <a href="">
                        <Lottie animationData={reports} className="nav-icon"/>
                        Reports</a>
                </li>
            </ul>
            {/*Logout section*/}
            <div className="nav-footer">
                <li className="nav-item">
                    <a href="">
                        <Lottie animationData={logout} className="nav-icon"/>
                        Logout</a>
                </li>
            </div>
        </div>

    );
}

export default Sidebar;