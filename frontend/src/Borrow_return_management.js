import React, {useEffect, useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import './Borrow_return_management.css';

function BorrowReturnManagement() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBooks = () => {
        fetch('http://localhost:8080/api/view/books')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBooks(data);
                } else {
                    setBooks([]);
                }
            })
            .catch(error => console.error(error));
    };

    // --- 2. UPDATED: Call fetchBooks on load ---
    useEffect(() => {
        fetchBooks();
    }, []);


    const filteredBooks = books.filter(book => {
        const name = book.bookName ? book.bookName.toLowerCase() : "";
        return name.includes(searchTerm.toLowerCase());
    });

    // --- 3. UPDATED: Handle Borrow with API Call ---
    const handleBorrow = async (bookId) => {
        console.log(`Attempting to borrow book with ID: ${bookId}`);

        try {
            // Call the backend
            const response = await fetch(`http://localhost:8080/api/books/borrow/${bookId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                alert("Book Borrowed Successfully!");
                // Refresh data immediately to show new quantity
                fetchBooks();
            } else {
                // Read the error message from the backend (e.g., "Out of stock")
                const errorMsg = await response.text();
                alert("Failed: " + errorMsg);
            }
        } catch (error) {
            console.error("Error borrowing book:", error);
            alert("Connection error");
        }
    };

    // Handle Return
    const handleReturn = async (bookId) => {
        console.log(`Returning book ID: ${bookId}`);

        try {
            // Call the NEW backend API
            const response = await fetch(`http://localhost:8080/api/books/return/${bookId}`, {
                method: 'PUT',
            });

            if (response.ok) {
                alert("Book Returned Successfully!");
                fetchBooks(); // Refresh the table immediately
            } else {
                alert("Failed to return book.");
            }
        } catch (error) {
            console.error("Error returning book:", error);
            alert("Connection error");
        }
    };



    // Helper for Status Color
    const getStatusClassName = (quantity) => {
        return quantity > 0 ? 'status-available' : 'status-borrowed';
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
                    placeholder="Search by book name"
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
                        <th>Book name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Borrow</th>
                        <th>Return</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredBooks.map(book => (
                        <tr key={book.bookId}>
                            <td>{book.bookId}</td>
                            <td>{book.bookName}</td>
                            <td>{book.quantity}</td>

                            <td>
                                {/* Logic: If quantity > 0, it's Available */}
                                <span className={`book-status ${getStatusClassName(book.quantity)}`}>
                                    {book.quantity > 0 ? "Available" : "All books are borrowed"}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="borrow-button"
                                    onClick={() => handleBorrow(book.bookId)}
                                    disabled={book.quantity === 0}
                                >
                                    Borrow
                                </button>
                            </td>

                            <td>
                                <button
                                    className="return-button" // We will style this next
                                    onClick={() => handleReturn(book.bookId)}
                                >
                                    Return
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