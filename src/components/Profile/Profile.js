import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooks } from '../../contexts/BookContext';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const { books, addBook, editBook, deleteBook } = useBooks();
    
    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        genre: '',
        condition: '',
        status: ''
    });

    const navigate = useNavigate();  // To navigate after logout

    const handleAddBook = () => {
        if (!bookDetails.title || !bookDetails.author || !bookDetails.genre || !bookDetails.condition || !bookDetails.status) {
            alert('Please fill in all fields');
            return;
        }

        const newBook = {
            ...bookDetails,
            id: Date.now(),
            userId: user?.id
        };
        addBook(newBook);
        setBookDetails({ title: '', author: '', genre: '', condition: '', status: '' });
    };

    const handleLogout = () => {
        logout();  // Call the logout function from AuthContext
        navigate('/login');  // Redirect user to login page after logging out
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2 className="profile-title">{user?.name || 'User'}'s Profile</h2>
                <Link to="/search" className="search-link">Search Books</Link>
            </div>

            <div className="book-form">
                <input type="text" placeholder="Title" value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} />
                <input type="text" placeholder="Author" value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} />
                <input type="text" placeholder="Genre" value={bookDetails.genre} onChange={(e) => setBookDetails({ ...bookDetails, genre: e.target.value })} />
                <input type="text" placeholder="Condition" value={bookDetails.condition} onChange={(e) => setBookDetails({ ...bookDetails, condition: e.target.value })} />
                <select value={bookDetails.status} onChange={(e) => setBookDetails({ ...bookDetails, status: e.target.value })}>
                    <option value="">Select Availability</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
                <button onClick={handleAddBook}>Add Book</button>
            </div>

            <h3>My Book Listings</h3>
            <ul className="book-list">
                {books.filter(book => book.userId === user?.id).map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author} ({book.status})
                        <button onClick={() => editBook(book.id, { ...book, title: prompt("New title", book.title) })}>Edit</button>
                        <button onClick={() => deleteBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Logout Button */}
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default Profile;
