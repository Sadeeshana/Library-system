import React from "react";
import './App.css';
import Login from './Login';
import './Login.css';
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Report from "./Report";
import {Routes,Route} from "react-router-dom";
import ModifyMember from "./Modify_member";


function DashboardLayout({children}) {
    return (
        <div className="app-container">
            {/* 2. Add the Sidebar component here */}
            <Sidebar />

            {/* 3. This will be our main content area */}
            <div className="main-content">
                {children}
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

                <Route
                    path="/dashboard"
                    element={
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    }
                />


                <Route
                    path="/Report"
                    element={
                        <DashboardLayout>
                            <Report />
                        </DashboardLayout>
                    }
                />



            </Routes>
        );
    }

export default App;