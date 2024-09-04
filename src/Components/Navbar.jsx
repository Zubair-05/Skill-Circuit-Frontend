import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3000/auth/status', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        })
            .then(response => response.json())
            .then(data => {
                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    navigate('/signup');
                }
            })
            .catch(err => {
                console.error('Error checking authentication status:', err);
            });
    }, [navigate]);

    const handleLogout = () => {
        fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then(() => {
                setIsAuthenticated(false);
                navigate('/signup');
                // Optionally redirect the user to the homepage or login page
            })
            .catch(err => {
                console.error('Error logging out:', err);
            });
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-3xl font-bold text-gray-800">CourseMart</div>
                <div>
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <a href="/login" className="text-gray-700 font-semibold hover:text-blue-500 mx-4">
                                Login
                            </a>
                            <a href="/signup" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Sign Up
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
