import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useNavigate} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useDispatch, useSelector} from "react-redux";
import {setUserDetails} from "@/store/features/userSlice.js";

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const url = `${process.env.BASE_URL}/auth/status`;
        fetch(url, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        })
            .then(response => response.json())
            .then(data => {
                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                    dispatch(setUserDetails(data.user.id));
                } else {
                    setIsAuthenticated(false);
                    navigate('/signup');
                }
            })
            .catch(err => {
                console.error('Error checking authentication status:', err);
            });
    }, [navigate]);

    const handleLogout = async () => {
        const url = process.env.BASE_URL + `/logout`;
        fetch(url, {
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
        <header className="bg-white shadow-md ">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-gray-100">
                <div className="text-3xl font-bold text-gray-800">Skill-Circuit</div>
                <div>
                    {isAuthenticated ? (

                        <DropdownMenu className="mr-4">
                            <DropdownMenuTrigger>
                                <Avatar className="cursor-pointer" onClick={handleLogout}>
                                    <AvatarImage src="https://github.com/shadcn.png"/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate('/courses')}>Courses</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/create-course')}>Create Course</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/cart')}>Cart</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
