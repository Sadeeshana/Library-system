import React, { useState } from 'react';
import { FaPencilAlt, FaTrashAlt, FaSearch } from 'react-icons/fa';
import './Add_book.css'; // Importing the CSS file

// Mock Data: In a real application, this would be fetched from your Spring Boot API.
const initialBooks = [
    { id: 101, title: 'Matilda', author: 'Roald Dahl', quantity: 3, status: 'Available' },
    { id: 102, title: 'Coraline', author: 'Neil Gaiman', quantity: 5, status: 'Borrowed' },
    { id: 103, title: 'Wonder', author: 'R.J. Palacio', quantity: 2, status: 'Available' },
    { id: 104, title: 'Holes', author: 'Louis Sachar', quantity: 4, status: 'Available' },
];

function BookListDashboard() { // Renamed the function to be descriptive
    const [books, setBooks] = useState(initialBooks);
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
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Render rows based on filteredBooks array */}
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