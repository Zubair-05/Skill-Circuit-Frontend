import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import {getApiCall} from "@/utils/apiHelper.js";

const InstructorCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const userId = useSelector(state => state.user.userId);
    useEffect(() => {
        // Fetch all courses by the instructor
        const fetchCourses = async () => {
            try {
                const response = await getApiCall(`/courses/instructor/${userId}`)
                setCourses(response?.data?.courses);
            } catch (error) {
                console.error("Error fetching courses", error);
            }
        };

        fetchCourses();
    }, [userId]);

    const handleEdit = (courseId) => {
        navigate(`/teacher/course-create/${courseId}`);
    };

    const handlePublish = async (courseId) => {
        try {
            await axios.put(`/api/courses/publish/${courseId}`);
            // Optionally, refetch the courses after publishing
            setCourses(prevCourses => prevCourses.map(course =>
                course._id === courseId ? { ...course, isPublished: true } : course
            ));
        } catch (error) {
            console.error("Error publishing course", error);
        }
    };

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`/api/courses/${courseId}`);
            // Optionally, refetch or filter out the deleted course
            setCourses(courses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error("Error deleting course", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Your Courses</h1>
            <button
                onClick={() => navigate('/teacher/create-course')} // Adjust the route as needed
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Create New Course
            </button>
            <div className="space-y-4">
                {courses?.length > 0 ? (
                    courses.map((course) => (
                        <div key={course._id}
                             className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                            <div>
                                <h2 className="text-xl font-bold">{course.title}</h2>
                                <p className="text-gray-600">{course.description}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                                    onClick={() => handleEdit(course._id)}
                                >
                                    Edit
                                </button>
                                {!course.isPublished && (
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                                        onClick={() => handlePublish(course._id)}
                                    >
                                        Publish
                                    </button>
                                )}
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                    onClick={() => handleDelete(course._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No courses found</p>
                )}
            </div>
        </div>
    );
};

export default InstructorCourses;
