import React, { useState } from 'react';
import './Newbook.css';

function AddBookModal({ isOpen, onClose, onBookAdded }) {
    const [bookData, setBookData] = useState({
        title: '',
        isbn: '',
        author: '',
        bookPrice: '',
        quantity: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/books/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });

            if (response.ok) {
                alert("Book Added Successfully!");
                onBookAdded();
                onClose();
                setBookData({ title: '', isbn: '', author: '', bookPrice: '', quantity: '' }); // Reset form
            } else {
                alert("Failed to add book.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Book</h2>
                <button className="close-btn" onClick={onClose}>×</button>

                <form onSubmit={handleSubmit}>
                    <label>Book Name</label>
                    <input name="title" placeholder="Enter Title" onChange={handleChange} required />

                    <label>ISBN</label>
                    <input name="isbn" placeholder="Enter ISBN" onChange={handleChange} required />

                    <label>Author</label>
                    <input name="author" placeholder="Enter Author" onChange={handleChange} required />

                    <div className="row">
                        <div className="col">
                            <label>Price</label>
                            <input name="bookPrice" type="number" placeholder="0.00" onChange={handleChange} required />
                        </div>
                        <div className="col">
                            <label>Quantity</label>
                            <input name="quantity" type="number" placeholder="0" onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="save-btn">Save Book</button>
                </form>
            </div>
        </div>
    );
}

export default AddBookModal;