import React, {useEffect, useState} from 'react';
import { FaPencilAlt, FaTrashAlt, FaSearch } from 'react-icons/fa';
import './Add_book.css';
import {isRouteErrorResponse} from "react-router-dom";
import { motion } from 'framer-motion';
import AddBookModal from './Newbook';
import EditBookModal from './Editbook';


function BookListDashboard() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const[selectedBook, setSelectedBook] = useState(null);


    //Search filter
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddBook = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (book) => {
        setSelectedBook(book);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure you want to delete book ID ${id}?`)) {
            try{
                const response = await fetch(`http://localhost:8080/api/books/delete/${id}`,{
                   method: 'DELETE',
                });

                if (response.ok) {
                    setBooks(books.filter(book => book.id !== id));
                    alert("Successfully deleted book");
                }else {
                    alert("Error occured!");
                }
            }catch (error) {
                console.log(error);
            }
        }
    };

    const getStatusClassName = (status) => {
        return status === 'Available' ? 'status-available' : 'status-borrowed';
    };

    const fetchBooks = () => {
        fetch('http://localhost:8080/api/books/all')
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch");
                return response.json();
            })
            .then(data => {
                // Safety check
                if(Array.isArray(data)) {
                    setBooks(data);
                } else {
                    setBooks([]);
                }
            })
            .catch(error => console.error(error));
    };

    // Load books
    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="book-list-page">
            <div className="book-list-header">
                <h2>Books</h2>
            </div>

            <div className="book-controls">
                <button className="add-button" onClick={handleAddBook}>
                    + Add Book
                </button>

                {/* Search input area */}
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

            {/* Books table */}
            <div className="book-table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>ISBN</th>
                        <th>Author</th>
                        <th>Book Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <AddBookModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onBookAdded={fetchBooks}
                    />
                    <EditBookModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onBookUpdated={fetchBooks}
                        bookToEdit={selectedBook}
                    />

                    {filteredBooks.map((book , index) => (
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

                            <td className="actions-cell">
                                <FaPencilAlt
                                    className="action-icon edit-icon"
                                    onClick={() => handleEdit(book)}
                                    title="Edit"
                                />
                            </td>
                            <td className="actions-cell">
                                <FaTrashAlt
                                    className="action-icon delete-icon"
                                    onClick={() => handleDelete(book.bookId)}
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