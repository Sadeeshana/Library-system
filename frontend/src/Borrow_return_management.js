import React, {useEffect, useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import './Borrow_return_management.css';
import BorrowModal from "./Borrowform";
import { motion, AnimatePresence } from 'framer-motion';
import ReturnModal from './Returnform'


function BorrowReturnManagement() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalAction, setModalAction] = useState('Borrow');
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

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

    //Load books
    useEffect(() => {
        fetchBooks();
    }, []);


    const filteredBooks = books.filter(book => {
        const name = book.bookName ? book.bookName.toLowerCase() : "";
        return name.includes(searchTerm.toLowerCase());
    });

    const openModal = (book, action) => {
        setSelectedBook(book); // Now 'book' is defined!
        setModalAction(action);
        setIsModalOpen(true);
    };

 //Handle borrow
    const handleBorrow = async (book) => {
       setSelectedBook(book);

       setModalAction('Borrow');

        setIsModalOpen(true);
    };

    // Handle Return
    const handleReturn = (book) => {
        setSelectedBook(book);
        setIsReturnModalOpen(true);
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
                <table className="borrow-table">
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

                        <AnimatePresence>
                            {filteredBooks.map((book, index) => (
                                <motion.tr
                                    key={book.bookId}
                                    layout

                                    initial={{ opacity: 0, x: -50 }}

                                    animate={{ opacity: 1, x: 0 }}

                                    exit={{ opacity: 0, x: -50 }}

                                    transition={{ duration: 0.3, delay: index * 0.1 }}

                                    whileHover={{ scale: 1.01, backgroundColor: "#f0f8ff" }}
                                >
                            <td>{book.bookId}</td>
                            <td>{book.bookName}</td>
                            <td>{book.quantity}</td>

                            <td>

                                <span className={`book-status ${getStatusClassName(book.quantity)}`}>
                                    {book.quantity > 0 ? "Available" : "All books are borrowed"}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="borrow-button"
                                    onClick={() => handleBorrow(book)}
                                    disabled={book.quantity === 0}
                                >
                                    Borrow
                                </button>
                            </td>

                            <td>
                                <button
                                    className="return-button" // We will style this next
                                    onClick={() => handleReturn(book)}
                                >
                                    Return
                                </button>
                            </td>

                                </motion.tr>

                    ))}
                        </AnimatePresence>
                    </tbody>
                </table>


                {/*Action type modals for buttons*/}
                <BorrowModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    book={selectedBook}
                    actionType={modalAction}
                    onSuccess={fetchBooks}
                />

                <ReturnModal
                    isOpen={isReturnModalOpen}
                    onClose={() => setIsReturnModalOpen(false)}
                    book={selectedBook}
                    onSuccess={fetchBooks}
                />


            </div>
        </div>
    );
}

export default BorrowReturnManagement;