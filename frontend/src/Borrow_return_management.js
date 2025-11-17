import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon
import './Borrow_return_management.css'; // Importing the CSS file

// Mock Data: This would come from your backend API
const initialBooks = [
    { id: 101, title: 'Matilda', author: 'Roald Dahl', totalCopies: 3, availableCopies: 2, status: 'Available' },
    { id: 102, title: 'Coraline', author: 'Neil Gaiman', totalCopies: 5, availableCopies: 0, status: 'Borrowed' },
    { id: 103, title: 'Wonder', author: 'R.J. Palacio', totalCopies: 2, availableCopies: 1, status: 'Available' },
    { id: 104, title: 'Holes', author: 'Louis Sachar', totalCopies: 4, availableCopies: 3, status: 'Available' },
    { id: 105, title: 'The Hobbit', author: 'J.R.R. Tolkien', totalCopies: 7, availableCopies: 7, status: 'Available' },
];

function BorrowReturnManagement() {
    const [books, setBooks] = useState(initialBooks);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter books based on search term (title or author)
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handler for the Borrow button
    const handleBorrow = (bookId) => {
        // In a real application, you'd send an API request to record the borrow
        // and update the book's available copies and status.
        console.log(`Attempting to borrow book with ID: ${bookId}`);

        // For demonstration: Update state directly
        setBooks(prevBooks =>
            prevBooks.map(book => {
                if (book.id === bookId && book.availableCopies > 0) {
                    // Simulate borrowing: decrement available copies, update status if no copies left
                    const newAvailableCopies = book.availableCopies - 1;
                    const newStatus = newAvailableCopies === 0 ? 'Borrowed' : 'Available';
                    alert(`"${book.title}" borrowed successfully!`);
                    return { ...book, availableCopies: newAvailableCopies, status: newStatus };
                } else if (book.id === bookId && book.availableCopies === 0) {
                    alert(`"${book.title}" is currently out of stock.`);
                }
                return book;
            })
        );
    };

    // Helper to determine if the Borrow button should be disabled
    const isBorrowDisabled = (availableCopies) => availableCopies === 0;

    // Helper to get status class (if you want different colors for Available/Borrowed)
    const getStatusClassName = (status) => {
        return status === 'Available' ? 'status-available' : 'status-borrowed';
    };

    return (
        <div className="borrow-return-page">
            <div className="page-header">
                <h2>Borrow/Return</h2>
            </div>

            <div className="search-bar-container">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by book name or author"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="book-table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Total Copies</th>
                        <th>Available Copies</th>
                        <th>Status</th>
                        <th></th> {/* Empty header for the action button column */}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredBooks.map(book => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.totalCopies}</td>
                            <td>{book.availableCopies}</td>
                            <td>
                                    <span className={`book-status ${getStatusClassName(book.status)}`}>
                                        {book.status}
                                    </span>
                            </td>
                            <td>
                                <button
                                    className="borrow-button"
                                    onClick={() => handleBorrow(book.id)}
                                    disabled={isBorrowDisabled(book.availableCopies)}
                                >
                                    Borrow
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BorrowReturnManagement;