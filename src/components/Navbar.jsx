import React, {useState, useEffect} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
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
import {setMode} from "@/store/features/modeSlice.js";
import {setUserDetails} from "@/store/features/userSlice.js";
import {setIsAuthenticated} from "@/store/features/authSlice.js";
import {getApiCall} from "@/utils/apiHelper.js";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const mode = useSelector(state => state.mode.mode);

    const toggleMode = async () => {
        if (mode === 'student') {
            dispatch(setMode('teacher'));
            try{
                console.log(`making call to fetch stripe status`)
                const response = await getApiCall(`/stripe/status`);
                if(response?.data?.isActivated){
                    navigate('/teacher')
                } else {
                    navigate('/teacher/billing')
                }
            } catch (err){
                console.log(err);
            }
            navigate('/teacher/billing')
        } else {
            dispatch(setMode('student'));
            navigate('/')
        }
    };

    const handleLogout = async () => {
        console.log(`calling logout function`)
        const url = process.env.BASE_URL + `/logout`;
        fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
            .then(() => {
                dispatch(setIsAuthenticated(false));
                navigate('/signin');
                // Optionally redirect the user to the homepage or login page
            })
            .catch(err => {
                console.error('Error logging out:', err);
            });

    };

    return (
        <header className="bg-white shadow-md w-full">
            <nav className="w-full px-6 py-4 flex justify-between items-center bg-gray-100">
                <div className="text-3xl font-bold text-gray-800">Skill-Circuit</div>
                <div>
                    {isAuthenticated ? (
                        <div className="flex justify-center items-center gap-2">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                onClick={toggleMode}
                            >
                                {mode === 'student' ? 'Teacher Mode' : 'Student Mode'}
                            </button>
                            <DropdownMenu className="mr-4">
                                <DropdownMenuTrigger>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png"/>
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    {
                                        mode === 'student' ? (
                                            <>
                                                <DropdownMenuItem onClick={() => navigate('/')}>Courses</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate('/cart')}>Cart</DropdownMenuItem>
                                            </>
                                        ) : (
                                            <>
                                                <DropdownMenuItem onClick={() => navigate('/teacher/create-course')}>Create Course</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate('/teacher/billing')}>Billing</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => navigate('/teacher')}>Courses</DropdownMenuItem>
                                            </>
                                        )
                                    }

                                    <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>

                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <button className="text-blue-500" onClick={() => navigate('/login')}>Login</button>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
// useEffect(() => {
//     const url = `${process.env.BASE_URL}/auth/status`;
//     fetch(url, {
//         method: 'GET',
//         credentials: 'include', // Include cookies in the request
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.isAuthenticated) {
//                 setIsAuthenticated(true);
//                 dispatch(setUserDetails(data.user.id));
//             } else {
//                 setIsAuthenticated(false);
//                 navigate('/signup');
//             }
//         })
//         .catch(err => {
//             console.error('Error checking authentication status:', err);
//         });
// }, [navigate]);