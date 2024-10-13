import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const goToCourses = () => {
        navigate('/'); // Redirect to courses page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
                <p className="text-lg mt-4">Congratulations! You've successfully enrolled in the course.</p>
                <button
                    className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                    onClick={goToCourses}
                >
                    View Courses
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
