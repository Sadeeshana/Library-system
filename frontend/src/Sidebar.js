import React from "react";
import './Sidebar.css';//Insert the css file
import DashIcon from './Dash.json';
import Book from './Book.json';
import borrow from './borrow.json';
import reports from './Report.json';
import Member from './Member.json';
import logout from './logout.json';
import Lottie from "lottie-react";
import {Link, useLocation} from "react-router-dom";

//Start main sidebar
function Sidebar(){
    //Current URl
    const location = useLocation();
    //Helper function for check path is active or not
    const getNavItemClass = (path) => {
        return location.pathname === path ? 'nav-item active' : 'nav-item';
    };


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
                <li className={getNavItemClass('/Dashboard')}>
                    <Link  to="/Dashboard">
                    <Lottie animationData={DashIcon} className="nav-icon"/>
                        Dashboard
                    </Link>

                </li>
                <li className="nav-item">
                   <Link  to="/Books">
                        <Lottie animationData={Book} className="nav-icon"/>
                        Books</Link>
                </li>
                <li className="nav-item">
                    <Link  to="/Members">
                        <Lottie animationData={Member} className="nav-icon"/>
                        Member</Link>
                </li>
                <li className="nav-item">
                    <Link  to="/borrow">
                        <Lottie animationData={borrow} className="nav-icon"/>
                        Borrow</Link>
                </li>
                <li className={getNavItemClass('/Report')}>
                    <Link to="/Report">
                        <Lottie animationData={reports} className="nav-icon"/>
                        Reports
                    </Link>
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