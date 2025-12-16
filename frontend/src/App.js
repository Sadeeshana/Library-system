import React, { useState } from "react";

import './App.css';
import Login from './Login';
import './Login.css';
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Report from "./Report";
import {Routes,Route} from "react-router-dom";
import ModifyMember from "./Modify_member";
import ForgetPassword from "./Forget_password";
import VerifyPassword from "./verify_password";
import Members from "./Members_page";
import BorrowReturn from "./Borrow_return_management";
import Add_book from "./Add_book";
import Libreg from "./librarian_register";
import Updatepass from "./Update_Password"
import InstantDetails from "./InstantDetails"
import { FaBars } from 'react-icons/fa';
import {Snowfall} from "react-snowfall";


function DashboardLayout({children}) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app-container">

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />


            {/* 3. This will be our main content area */}
            <div className="main-content">

                <div className="content-area">
                {children}
                </div>
            </div>
        </div>
    )
}


        //Route

    function App() {
        return (





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
                    path="/members"
                    element={
                        <DashboardLayout>
                            <Members />
                        </DashboardLayout>
                    }

                />

                <Route
                path="/Books"
                element={
                    <DashboardLayout>
                        <Add_book/>
                    </DashboardLayout>
                }
                />

                <Route
                    path="/borrow"
                    element={
                    <DashboardLayout>
                        <BorrowReturn />
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

                <Route
                    path="/forgot-password"
                    element={<ForgetPassword />} />

                <Route
                    path="/verify-password"
                    element={<VerifyPassword/>}
                />
                <Route
                    path="/Lib-register"
                    element={<Libreg/>}
                />
                <Route
                path="/Update-password"
                element={<Updatepass />}
                />

                <Route
                path="/InstantDetails"
                element={
                    <DashboardLayout>
                    <InstantDetails />
                    </DashboardLayout>
                    }
                />



            </Routes>

        );
    }

export default App;