// src/contexts/BookContext.js
import React, { createContext, useContext, useState } from 'react';

const BookContext = createContext();

const sampleBooks = [
    { id: 1, title: "JavaScript Basics", author: "John Doe", genre: "Programming", condition: "Good", status: "Available", location: "New York" },
    { id: 2, title: "React Guide", author: "Jane Smith", genre: "Programming", condition: "Like New", status: "Available", location: "San Francisco" },
    { id: 3, title: "Cooking 101", author: "Alice Johnson", genre: "Cooking", condition: "Fair", status: "Unavailable", location: "Chicago" },
    { id: 4, title: "Data Structures", author: "Robert Brown", genre: "Programming", condition: "Good", status: "Available", location: "Austin" },
    // Add more sample data if needed
];

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState(sampleBooks);

    // Function to add a book
    const addBook = (book) => {
        setBooks((prevBooks) => [...prevBooks, { ...book, id: Date.now() }]);
    };

    // Function to edit a book
    const editBook = (bookId, updatedBook) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === bookId ? { ...book, ...updatedBook } : book))
        );
    };

    // Function to delete a book
    const deleteBook = (bookId) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    };

    // Function to search books based on criteria
    const searchBooks = ({ searchTerm = '', filterStatus = '', filterGenre = '', filterLocation = '', currentPage = 1, resultsPerPage = 2 }) => {
        const filteredBooks = books
            .filter((book) => {
                const matchesSearch = 
                    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    book.genre.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = filterStatus ? book.status === filterStatus : true;
                const matchesGenre = filterGenre ? book.genre === filterGenre : true;
                const matchesLocation = filterLocation ? book.location.toLowerCase().includes(filterLocation.toLowerCase()) : true;
                return matchesSearch && matchesStatus && matchesGenre && matchesLocation;
            })
            .slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
        
        return filteredBooks;
    };

    return (
        <BookContext.Provider value={{ books, addBook, editBook, deleteBook, searchBooks }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBooks = () => useContext(BookContext);
