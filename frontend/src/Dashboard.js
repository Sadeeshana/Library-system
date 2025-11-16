
import React from "react";
import './Dashboard.css'
import App from "./App";

//Add all icons
import {
    BsBookFill,
    BsFillPeopleFill,
    BsFillBookmarkCheckFill,
    BsFillClockFill,
    BsPersonCheckFill,
    BsArrowUpSquareFill

}from 'react-icons/bs';

function Dashboard(){
    return (
        <div className="Dashboard-container">
            <div className="dashboard-header">
                Dashboard

            </div>
            {/*In here include Cards in the body*/}
            <div className="Dashboard-body">

                <div className="stat-card">
                    <div className="card-top-row">
                        <div className="card-left-col">
                        <div className="card-icon">
                            <BsBookFill/>
                        </div>
                        </div>
                        <div className="card-title">Total books</div>
                    </div>
                    <div className="card-value">500</div>
                </div>


                <div className="stat-card card-border-blue">
                    <div className="card-top-row">
                        <div className="card-icon icon-red">
                            <BsFillPeopleFill />
                        </div>
                        <div className="card-title">Total Members</div>
                    </div>
                    <div className="card-value">200</div>
                </div>


                <div className="stat-card card-border-purple">
                    <div className="card-top-row">
                        <div className="card-icon icon-purple">
                            <BsFillBookmarkCheckFill />
                        </div>
                        <div className="card-title">Borrowed Books</div>
                    </div>
                    <div className="card-value">100</div>
                </div>


                <div className="stat-card card-border-orange">
                    <div className="card-top-row">
                        <div className="card-icon icon-orange">
                            <BsFillClockFill />
                        </div>
                        <div className="card-title">Overdue Books</div>
                    </div>
                    <div className="card-value">10</div>
                </div>


                <div className="stat-card card-border-red">
                    <div className="card-top-row">
                        <div className="card-icon icon-red">
                            <BsPersonCheckFill />
                        </div>
                        <div className="card-title">Active Members</div>
                    </div>
                    <div className="card-value">150</div>
                </div>


                <div className="stat-card card-border-yellow">
                    <div className="card-top-row">
                        <div className="card-icon icon-yellow">
                            <BsArrowUpSquareFill />
                        </div>
                        <div className="card-title">Returned Books</div>
                    </div>
                    <div className="card-value">90</div>
                </div>





            </div>




        </div>

    )
}
export default Dashboard;