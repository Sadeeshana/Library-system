import React, { useState, useEffect } from 'react';
import './Editbook.css';

function EditBookModal({ isOpen, onClose, onBookUpdated, bookToEdit }) {
    const [bookData, setBookData] = useState({
        title: '',
        isbn: '',
        author: '',
        bookPrice: '',
        quantity: ''
    });

    useEffect(() => {
        if (bookToEdit) {
            setBookData({
                title: bookToEdit.title || '',
                isbn: bookToEdit.isbn || '',
                author: bookToEdit.author || '',
                bookPrice: bookToEdit.bookPrice || '',
                quantity: bookToEdit.quantity || ''
            });
        }
    }, [bookToEdit]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/books/update/${bookToEdit.bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });

            if (response.ok) {
                alert("Book Updated Successfully!");
                onBookUpdated();
                onClose();
            } else {
                alert("Failed to update book.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Book</h2>
                <button className="close-btn" onClick={onClose}>×</button>

                <form onSubmit={handleSubmit}>
                    <label>Book Name</label>
                    <input name="title" value={bookData.title} onChange={handleChange} required />

                    <label>ISBN</label>
                    <input name="isbn" value={bookData.isbn} onChange={handleChange} required />

                    <label>Author</label>
                    <input name="author" value={bookData.author} onChange={handleChange} required />

                    <div className="row">
                        <div className="col">
                            <label>Price</label>
                            <input name="bookPrice" type="number" value={bookData.bookPrice} onChange={handleChange} required />
                        </div>
                        <div className="col">
                            <label>Quantity</label>
                            <input name="quantity" type="number" value={bookData.quantity} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="save-btn">Update Book</button>
                </form>
            </div>
        </div>
    );
}

export default EditBookModal;