import React, { createContext, useContext, useState, useEffect } from 'react';

// Function to load user data from local storage
const loadUsersFromLocalStorage = () => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    // Load users from local storage
    const [mockUserDatabase, setMockUserDatabase] = useState(loadUsersFromLocalStorage);

    // Save users to local storage whenever the user database changes
    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(mockUserDatabase));
    }, [mockUserDatabase]);

    const register = (username, email, password) => {
        const existingUser = mockUserDatabase.find((u) => u.email === email);
        if (existingUser) {
            setError('User already exists with this email.');
            return;
        }

        // Store user securely (mock example, should use hashing in real implementation)
        const newUser = { id: mockUserDatabase.length + 1, username, email, password }; // In a real app, hash the password
        setMockUserDatabase((prev) => [...prev, newUser]);
        setUser(newUser);
    };

    const login = (email, password) => {
        const existingUser = mockUserDatabase.find((u) => u.email === email && u.password === password);
        if (existingUser) {
            setUser(existingUser);
            setError('');
        } else {
            setError('Invalid email or password.');
        }
    };

    // Logout function that clears user session
    const logout = () => {
        setUser(null); // Clear user state
        setError('');  // Clear any errors
        localStorage.removeItem('currentUser'); // Optionally clear user from local storage
    };

    const resetPassword = (email, newPassword) => {
        const existingUser = mockUserDatabase.find((u) => u.email === email);
        if (existingUser) {
            existingUser.password = newPassword; // In a real app, hash the new password
            setMockUserDatabase([...mockUserDatabase]); // Trigger a re-render
            setError('');
            return true;
        } else {
            setError('User not found.');
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            register,
            login,
            logout, // Exposing logout method
            resetPassword,
            error,
            recoveryEmail,
            setRecoveryEmail,
            newPassword,
            setNewPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
