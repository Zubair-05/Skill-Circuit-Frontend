import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setIsAuthenticated} from "@/store/features/authSlice.js";

const PrivateRoutes = () => { // Start with null to handle loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    useEffect(() => {

        const checkAuthStatus = async () => {
            try {
                const url = `${process.env.BASE_URL}/auth/status`;
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include', // Include cookies in the request
                });

                const data = await response.json();

                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                    dispatch(setUserDetails(data.user.id)); // Store user details
                } else {
                    setIsAuthenticated(false);
                    navigate('/signup');
                }
            } catch (err) {
                console.error('Error checking authentication status:', err);
                setIsAuthenticated(false);
                navigate('/signup'); // Redirect to signup on error
            }
        };

        checkAuthStatus();
    }, [dispatch, navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading state while checking auth
    }

    return isAuthenticated ? <Outlet /> : null; // Render the component if authenticated
};

export default PrivateRoutes;
