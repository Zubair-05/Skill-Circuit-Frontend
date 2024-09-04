import React from 'react';

const Signin = () => {

    const loginWithGoogle = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    }
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" className="w-full border rounded-md px-4 py-2" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <input type="password" className="w-full border rounded-md px-4 py-2" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Signin;