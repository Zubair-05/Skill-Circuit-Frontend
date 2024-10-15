import React, {useEffect, useState} from 'react';
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function PurchasedCourses() {
    // Course data with 13 courses
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const fetchCourses = async () => {
        try {
            const url = `${process.env.BASE_URL}/course/purchased`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include', // This ensures cookies (including the session cookie) are sent
            });

            if (response.ok) {
                const data = await response.json();
                setCourses(data.courses);
            } else {
                const errorData = await response.json();
                console.log(errorData);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                    <div key={course.id} onClick={() => navigate(`/courses/${course.id}`)}
                         className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm cursor-pointer">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <img
                                    src={course?.teacher?.profilePicture}
                                    alt={course.instructorName}
                                    className="w-10 h-10 rounded-full border border-gray-300"
                                />
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold">{course.title}</h2>
                                    <p className="text-gray-500 text-sm">{course?.teacher?.name}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                            <div className="flex items-center mb-4">
                                <span className={"text-sm"}>
                                    {/*{course.rating}*/}
                                    4.5
                                </span>
                                <span className="text-yellow-500">
                {'★'.repeat(Math.round(4.5))}{'☆'.repeat(5 - Math.round(4.5))}
              </span>
                                <span className="text-gray-500 text-xs ml-2">
                                    {/*{(`${course.numRatings}`)}*/}
                                    4.5
                                    ratings
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">₹{course.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PurchasedCourses;
