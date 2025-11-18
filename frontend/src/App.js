import React from "react";
import './App.css';
import BorrowReturnManagement from "./Borrow_return_management";
import Modify_member from "./Modify_member";
import Sidebar from "./Sidebar";
import Add_book from "./Add_book";


function App() {
    return (
        <div className="app-container">
            {/* 2. Add the Sidebar component here */}
            <Sidebar />

            {/* 3. This will be our main content area*/}
            <div className="main-content">
                <BorrowReturnManagement />
            </div>
        </div>

    )
}

export default App;