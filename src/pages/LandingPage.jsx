import React from 'react';
import Navbar from '@/components/Navbar.jsx';
import Footer from "@/components/Footer.jsx";

function Landing() {
    return (
        <div className="min-h-screen flex flex-col">
            <section className="flex flex-col items-center justify-center flex-grow bg-gray-100 py-20 text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    Discover the Best Online Courses
                </h1>
                <p className="text-gray-700 text-xl mb-8">
                    Learn from the best instructors and grow your skills from anywhere in the world.
                </p>
                <a href="/courses" className="bg-blue-500 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-600 transition-colors">
                    Browse Courses
                </a>
            </section>
        </div>
    );
}

export default Landing;
