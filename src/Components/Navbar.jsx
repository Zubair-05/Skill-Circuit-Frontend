import React from 'react';

function Navbar() {
    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-3xl font-bold text-gray-800">CourseMart</div>
                {/*<div>*/}
                {/*    <a href="/login" className="text-gray-700 font-semibold hover:text-blue-500 mx-4">Login</a>*/}
                {/*    <a href="/signup" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</a>*/}
                {/*</div>*/}
            </nav>
        </header>
    );
}

export default Navbar;
