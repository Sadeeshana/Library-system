import React, { useState } from 'react';
import { FaPencilAlt, FaTrashAlt, FaSearch } from 'react-icons/fa';
import './Add_book.css';

// Temporary Data
const initialBooks = [
    { id: 101, title: 'Matilda', author: 'Roald Dahl', quantity: 3, status: 'Available' },
    { id: 102, title: 'Coraline', author: 'Neil Gaiman', quantity: 5, status: 'Borrowed' },
    { id: 103, title: 'Wonder', author: 'R.J. Palacio', quantity: 2, status: 'Available' },
    { id: 104, title: 'Holes', author: 'Louis Sachar', quantity: 4, status: 'Available' },
];

function BookListDashboard() {
    const [books, setBooks] = useState(initialBooks);
    const [searchTerm, setSearchTerm] = useState('');

    // Search Logic
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add Book Button (Placeholder)
    const handleAddBook = () => {
        console.log('Opening Add Book Modal/Form...');
        alert('Placeholder: Opens a form to add a new book.');
    };

    // Edit Book (Placeholder)
    const handleEdit = (id) => {
        console.log(`Editing book with ID: ${id}`);
        alert(`Placeholder: Editing book with ID: ${id}`);
    };

    // Delete Book
    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete book ID ${id}?`)) {
            setBooks(books.filter(book => book.id !== id));
            console.log(`Book ID ${id} deleted.`);
        }
    };

    // Status Badge
    const getStatusClassName = (status) => {
        return status === 'Available' ? 'status-available' : 'status-borrowed';
    };

    return (
        <div className="book-list-page">
            <div className="book-list-header">
                <h2>Books</h2>
            </div>

            <div className="book-controls">
                <button className="add-button" onClick={handleAddBook}>
                    + Add Book
                </button>

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

            <div className="book-table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
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
                                <FaTrashAlt
                                    className="action-icon delete-icon"
                                    onClick={() => handleDelete(book.id)}
                                    title="Delete"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookListDashboard;