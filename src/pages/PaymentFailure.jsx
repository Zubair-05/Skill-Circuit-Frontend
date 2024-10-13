import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
    const navigate = useNavigate();

    const goBackToCourses = () => {
        navigate('/'); // Redirect back to courses page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-red-600">Payment Failed or Canceled</h1>
                <p className="text-lg mt-4">It looks like your payment was not successful or was canceled.</p>
                <button
                    className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                    onClick={goBackToCourses}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default PaymentFailure;
