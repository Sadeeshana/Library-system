import React from "react";
import Login from './Login';
import './Login.css';
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import {Routes, Route} from "react-router-dom";
import './App.css';

function App() {
    return (
        <div className="app-container">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main content on the right */}
            <div className="main-content">
                <BorrowReturnManagement />
            </div>
        </div>

    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboardlayout />} />
        </Routes>
    );
}

export default App;