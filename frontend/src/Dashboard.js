
import React,{useState , useEffect} from "react";
import './Dashboard.css'
import App from "./App";
import CountUp from 'react-countup';

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


    //Backend part for count total books
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/books/total')
            .then(response => response.json())
            .then(data => {
                console.log("Data fetched:", data);
                setTotalBooks(data); // Updates the variable
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    //Backend part for count total members
    const [totalMembers, setTotalMembers] = useState(0);

    useEffect(() => {
        // This calls your Spring Boot Backend
        fetch('http://localhost:8080/api/members/total')
            .then(response => response.json())
            .then(data => {
                console.log("Data fetched:", data);
                setTotalMembers(data); // Updates the variable
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);


    //Backend part for count active members
    const [totalactive, setTotalActive] = useState(0);

    useEffect(() => {
        // This calls your Spring Boot Backend
        fetch('http://localhost:8080/api/active-members/count')
            .then(response => response.json())
            .then(data => {
                console.log("Data fetched:", data);
                setTotalActive(data); // Updates the variable
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);


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
                    <div className="card-value">
                        <CountUp end={totalBooks} duration={3} />
                    </div>
                </div>


                <div className="stat-card card-border-blue">
                    <div className="card-top-row">
                        <div className="card-icon icon-red">
                            <BsFillPeopleFill />
                        </div>
                        <div className="card-title">Total Members</div>
                    </div>
                    <div className="card-value">
                        <CountUp end={totalMembers} duration={3} />
                    </div>
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
                    <div className="card-value">
                        <CountUp end={totalactive} duration={3} />
                    </div>
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