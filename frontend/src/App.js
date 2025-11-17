import React from "react";
import './App.css';
import BorrowReturnManagement from "./Borrow_return_management";
import Modify_member from "./Modify_member";


function App() {
    return (
        <div className="app-container">
            {/* 2. Add the Sidebar component here */}
            <Modify_member />

            {/* 3. This will be our main content area
            <div className="main-content">
                < />
            </div>*/}
        </div>

    )
}



import Login from './Login';
import './Login.css';
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import {Routes,Route} from "react-router-dom";


function Dashboardlayout() {
    return (
        <div className="app-container">
            {/* 2. Add the Sidebar component here */}
            <Sidebar />

            {/* 3. This will be our main content area */}
            <div className="main-content">
                <Dashboard />
            </div>
        </div>
    )
}


        //Route
    function App() {
        return (
            // 3. DEFINE YOUR ROUTES
            <Routes>
                {/* URL "/" will show the Login Page */}
                <Route path="/" element={<Login />} />

                {/* URL "/dashboard" will show the Dashboard Page */}
                <Route path="/dashboard" element={<Dashboardlayout />} />
            </Routes>
        );
    }

export default App;