import React, { useState } from 'react';
import './InstantDetails.css';
import { FaUser, FaBook, FaIdBadge, FaSearch } from 'react-icons/fa';

function InstantDetails() {
    const [searchType, setSearchType] = useState('member'); // Default to member

    const [searchId, setSearchId] = useState('');
    const [resultData, setResultData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setResultData(null);

        if (!searchId) {
            setError("Please enter valid id");
            return;
        }
       try{
            const response = await fetch(`http://localhost:8080/api/search/${searchType}/${searchId}`);
            const data = await response.json();

            if (response.ok){
                console.log(data);
                setResultData(data);
            }else {
                setError("Details not found in records");
            }

       }catch(error){
            setError("Server connection error");
       }


    };

    const renderResultCard = () => {
        if (!resultData) return null;

        return (
            <div className="result-card slide-up">
                <div className={`card-header-stripe ${searchType}`}></div>
                <div className="card-content">

                    {/* Dynamic Icon based on type */}
                    <div className="result-icon-circle">
                        {searchType === 'member' && <FaUser />}
                        {searchType === 'book' && <FaBook />}
                        {searchType === 'employee' && <FaIdBadge />}
                    </div>

                    <h3 className="result-title">
                        {resultData.name || resultData.title}
                    </h3>
                    <p className="result-subtitle">{searchType.toUpperCase()} DETAILS</p>

                    <div className="details-grid">
                        {Object.entries(resultData).map(([key, value]) => (
                            <div className="detail-item" key={key}>
                                <span className="detail-label">{key.toUpperCase()}</span>
                                <span className="detail-value">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="details-page">
            <h2 className="page-heading">Instant Details Lookup</h2>

            {/*Type selector*/}
            <div className="tabs-container">
                <button
                    className={`tab-btn ${searchType === 'member' ? 'active' : ''}`}
                    onClick={() => { setSearchType('member'); setResultData(null); setSearchId(''); }}
                >
                    <FaUser /> Member
                </button>
                <button
                    className={`tab-btn ${searchType === 'book' ? 'active' : ''}`}
                    onClick={() => { setSearchType('book'); setResultData(null); setSearchId(''); }}
                >
                    <FaBook /> Book
                </button>
                <button
                    className={`tab-btn ${searchType === 'employee' ? 'active' : ''}`}
                    onClick={() => { setSearchType('employee'); setResultData(null); setSearchId(''); }}
                >
                    <FaIdBadge /> Employee
                </button>
            </div>

            <form className="search-box-wrapper" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="big-search-input"
                    placeholder={`Enter ${searchType.charAt(0).toUpperCase() + searchType.slice(1)} ID...`}
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button type="submit" className="big-search-btn">
                    <FaSearch /> Search
                </button>
            </form>

            <div className="results-area">
                {error && <p className="error-msg">{error}</p>}
                {renderResultCard()}
            </div>
        </div>
    );
}

export default InstantDetails;