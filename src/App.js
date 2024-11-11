import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext'; // Ensure you import BookProvider
import Login from './components/Auth/Login'; // Ensure "Login" matches the file name casing
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile'; // Your Profile component
import SearchBooks from './components/Search/SearchBooks'; // Assuming this exists
import './styles.css';

function App() {
    return (
        <AuthProvider>
            <BookProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/search" element={<SearchBooks />} />
                        {/* Add more routes as needed */}
                        <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
                    </Routes>
                </Router>
            </BookProvider>
        </AuthProvider>
    );
}

export default App;
