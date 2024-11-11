import React, { useState } from 'react';
import { useBooks } from '../../contexts/BookContext';
import './SearchBooks.css';

function SearchBooks() {
    const { searchBooks } = useBooks();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterGenre, setFilterGenre] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedBookId, setExpandedBookId] = useState(null); // Track expanded book
    const resultsPerPage = 2;

    const filteredBooks = searchBooks({
        searchTerm,
        filterStatus,
        filterGenre,
        filterLocation,
        currentPage,
        resultsPerPage
    });

    const handleNextPage = () => setCurrentPage((prev) => prev + 1);
    const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    
    const toggleBookDetails = (bookId) => {
        setExpandedBookId(expandedBookId === bookId ? null : bookId); // Toggle book details
    };

    return (
        <div className="search-container">
            <h2>Search Books</h2>
            <input
                type="text"
                placeholder="Search by title, author, genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>
                <label>
                    Status:
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </label>

                <label>
                    Genre:
                    <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
                        <option value="">All</option>
                        <option value="Programming">Programming</option>
                        <option value="Cooking">Cooking</option>
                    </select>
                </label>

                <label>
                    Location:
                    <input
                        type="text"
                        placeholder="Search by location..."
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                    />
                </label>
            </div>

            <ul className="book-list">
                {filteredBooks.length === 0 ? (
                    <p>No books found</p>
                ) : (
                    filteredBooks.map((book) => (
                        <li key={book.id} className="book-item">
                            <h3 onClick={() => toggleBookDetails(book.id)} className="book-title">
                                {book.title}
                            </h3>
                            {expandedBookId === book.id && (
                                <div className="book-details">
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Genre:</strong> {book.genre}</p>
                                    <p><strong>Condition:</strong> {book.condition}</p>
                                    <p><strong>Status:</strong> {book.status}</p>
                                    <p><strong>Location:</strong> {book.location}</p>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>

            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button 
                    onClick={handleNextPage} 
                    disabled={filteredBooks.length < resultsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default SearchBooks;
