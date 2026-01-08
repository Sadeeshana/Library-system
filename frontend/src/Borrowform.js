import React, { useState } from 'react';
import './Newbook.css';
function BorrowModal({ isOpen, onClose, book, onSuccess }) {
    const [memberId, setMemberId] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/books/borrow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: book.bookId,
                    memberId: parseInt(memberId)
                })
            });

            const msg = await response.text();

            if (response.ok) {
                alert(msg); // Book borrowed successfully
                onSuccess(); // Refresh table
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
                <h2>Borrow Book</h2>
                <p><strong>Book ID:</strong> {book?.bookId}</p>
                <p><strong>Title:</strong> {book?.bookName}</p>

                {/*Submit buttons*/}
                <button className="close-btn" onClick={onClose}>×</button>

                <form onSubmit={handleSubmit}>
                    <label>Enter Member ID</label>
                    <input
                        type="number"
                        placeholder="Member ID"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                    />

                    <button type="submit" className="save-btn">
                        Confirm Borrow
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BorrowModal;