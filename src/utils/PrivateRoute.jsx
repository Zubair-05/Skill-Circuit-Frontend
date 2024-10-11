import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/actions'; // Your action to set user details

const PrivateRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to handle loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
