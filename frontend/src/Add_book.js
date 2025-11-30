import React, {useEffect, useState} from 'react';
import { FaPencilAlt, FaTrashAlt, FaSearch } from 'react-icons/fa';
import './Add_book.css';
import {isRouteErrorResponse} from "react-router-dom"; // Importing the CSS file
import { motion } from 'framer-motion';


function BookListDashboard() { // Renamed the function to be descriptive
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // 1. Search Logic: Filters the books based on title or author match
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Action Handlers (Placeholders)
    const handleAddBook = () => {
        console.log('Opening Add Book Modal/Form...');
        alert('Placeholder: Opens a form to add a new book.');
    };

    const handleEdit = (id) => {
        console.log(`Editing book with ID: ${id}`);
        alert(`Placeholder: Editing book with ID: ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete book ID ${id}?`)) {
            // Client-side delete for demo, replace with API call in production
            setBooks(books.filter(book => book.id !== id));
            console.log(`Book ID ${id} deleted.`);
        }
    };

    // 3. Status Badge Helper for dynamic styling
    const getStatusClassName = (status) => {
        return status === 'Available' ? 'status-available' : 'status-borrowed';
    };

    useEffect(() => {
        //Fetch the list from new api
        fetch('http://localhost:8080/api/books/all')
        .then(response => response.json())
            .then(data => {
                console.log(data);
                setBooks(data);
            })
        .catch(error => console.error(error));
    },[]);

    return (
        <div className="book-list-page">
            <div className="book-list-header">
                <h2>Books</h2>
            </div>

            <div className="book-controls">
                <button className="add-button" onClick={handleAddBook}>
                    + Add Book
                </button>

                {/* Search Input Area */}
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by book name or author"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Books Table */}
            <div className="book-table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>ISBN</th>
                        <th>Author</th>
                        <th>Book Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/* Render rows based on filteredBooks array */}
                    {filteredBooks.map((book , index) => (
                        //Waterfall effect
                        <motion.tr key={book.bookId}
                        initial={{opacity:0,y:0}}
                                   animate={{opacity:1,y:0}}
                              transition={{duration:0.3,delay:index *0.1}}

                        >
                            <td>{book.bookId}</td>
                            <td>{book.title}</td>
                            <td>{book.isbn}</td>
                            <td>{book.author}</td>
                            <td>{book.bookPrice}</td>
                            <td>{book.quantity}</td>
                            <td>
                  <span className={`book-status ${getStatusClassName(book.status)}`}>
                    {book.status}
                  </span>
                            </td>
                            <td className="actions-cell">
                                <FaPencilAlt
                                    className="action-icon edit-icon"
                                    onClick={() => handleEdit(book.id)}
                                    title="Edit"
                                />
                            </td>
                            <td className="actions-cell">
                                <FaTrashAlt
                                    className="action-icon delete-icon"
                                    onClick={() => handleDelete(book.id)}
                                    title="Delete"
                                />
                            </td>

                        </motion.tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookListDashboard;