import React from "react";
import './Sidebar.css';
import Login from './Login';
import DashIcon from './Dash.json';
import Book from './Book.json';
import borrow from './borrow.json';
import reports from './Report.json';
import Member from './Member.json';
import logout from './logout.json';
import Udetails from './Udetails.json';
import Lottie from "lottie-react";
import {Link, useLocation,useNavigate} from "react-router-dom";
import{motion, AnimatePresence} from "framer-motion";

//Start main sidebar
function Sidebar(){
    const location = useLocation();
    const navigate = useNavigate();
    const[isLoggingOut , setIsLoggingOut] = React.useState(false);


    //Get user role from local storage
    const userRole = localStorage.getItem("userRole");


    //Helper function for check path is active or not
    const getNavItemClass = (path) => {
        return location.pathname === path ? 'nav-item active' : 'nav-item';
    };

    const handleLogout = (e) => {
        e.preventDefault();
        setIsLoggingOut(true);
        localStorage.removeItem("userRole");

        setTimeout(() => {
            navigate('/');
        },1500);
    };



    return(
<>
    {/*Logout animation*/}
        <AnimatePresence>
            {isLoggingOut && (
                <motion.div
                    className="logout-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="logout-message"
                    >
                        <h2>See you soon!</h2>
                        <div className="spinner"></div>
                        <p>Logging out...</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

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
                {/*Add admin only pages*/}

                <li className={getNavItemClass('/Books')}>
                   <Link  to="/Books">
                        <Lottie animationData={Book} className="nav-icon"/>
                        Books</Link>
                </li>
                <li className={getNavItemClass('/Members')}>
                    <Link  to="/Members">
                        <Lottie animationData={Member} className="nav-icon"/>
                        Member</Link>
                </li>
                <li className={getNavItemClass('/borrow')}>
                    <Link  to="/borrow">
                        <Lottie animationData={borrow} className="nav-icon"/>
                        Borrow</Link>
                </li>
                {userRole === 'Admin' && (
                <li className={getNavItemClass('/Report')}>
                    <Link to="/Report">
                        <Lottie animationData={reports} className="nav-icon"/>
                        Reports
                    </Link>
                </li>
                    )}
                {userRole === 'Admin' && (
                    <li className={getNavItemClass('/InstantDetails')}>
                        <Link  to="/InstantDetails">
                            <Lottie animationData={Udetails} className="nav-icon"/>
                            Instant details
                        </Link>
                    </li>
                )}

            </ul>
            {/*Logout section*/}
            <div className="nav-footer">
                <li className="nav-item">

                    <a href="#" onClick={handleLogout}>
                        <Lottie
                            animationData={logout}
                            className="nav-icon"
                            style={{ width: 28, height: 28 }}
                        />
                        Logout
                    </a>
                </li>
            </div>
        </div>
</>
    );
}

export default Sidebar;