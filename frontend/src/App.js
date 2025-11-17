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


export default App;