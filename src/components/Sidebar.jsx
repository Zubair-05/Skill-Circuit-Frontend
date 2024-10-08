import React from 'react';

const Sidebar = ({ isOpen, isTeacherMode, toggleSidebar }) => {
    return (
        <div
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white p-6 transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block`}
        >
            <ul className="space-y-4">
                <li><a href="/courses" className="hover:underline">All Courses</a></li>
                <li><a href="/purchased-courses" className="hover:underline">Purchased Courses</a></li>
                <li><a href="/cart" className="hover:underline">Cart</a></li>

                {!isTeacherMode && (
                    <li><button className="hover:underline">Switch to Teacher Mode</button></li>
                )}

                {isTeacherMode && (
                    <>
                        <li><a href="/view-courses" className="hover:underline">View Courses</a></li>
                        <li><a href="/course-create" className="hover:underline">Create Course</a></li>
                    </>
                )}

                <li><button className="hover:underline">Logout</button></li>
            </ul>

            {/* Close button for mobile view */}
            <button
                className="absolute top-4 right-4 lg:hidden text-white"
                onClick={toggleSidebar}
            >
                ✕
            </button>
        </div>
    );
};

export default Sidebar;
