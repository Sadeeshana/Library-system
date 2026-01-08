import React, { useState } from 'react';
import './Add_book.css';

function ReturnModal({ isOpen, onClose, book, onSuccess }) {
    const [memberId, setMemberId] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!memberId) {
            alert("Please enter a Member ID");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/books/return', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: book.bookId,
                    memberId: parseInt(memberId)
                })
            });

            const msg = await response.text();

            if (response.ok) {
                alert(msg);
                onSuccess();
                onClose();
                setMemberId('');
            } else {
                alert("Error: " + msg);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Connection Failed");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{color: '#d32f2f'}}>Return Book</h2>
                <p><strong>Book:</strong> {book?.bookName}</p>

                <button className="close-btn" onClick={onClose}>×</button>

                <form onSubmit={handleSubmit}>
                    <label>Enter Member ID</label>
                    <input
                        type="number"
                        placeholder="Member ID who is returning"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                        autoFocus
                    />

                    <button type="submit" className="save-btn" style={{backgroundColor: '#d32f2f'}}>
                        Confirm Return
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReturnModal;