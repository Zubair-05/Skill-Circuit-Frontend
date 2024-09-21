import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {setId} from "@/store/features/courseSlice.js";

const CourseTitlePage = () => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title) {
            setError('Title is required');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // API call to save the course title
            const response = await axios.post('http://localhost:3000/courses/create',
                {
                    title
                },
                {
                    withCredentials: true,
                }
            );

            // Assuming the backend returns courseId
            const {courseId} = response.data;
            dispatch(setId(courseId));
            console.log(`courseId: ${courseId}`);
            // Navigate to the course creation page with courseId
            navigate(`/course-create/${courseId}`);

        } catch (error) {
            setError('Error creating course. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        // <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Create a New Course</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Course Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            error ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter course title"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Next'}
                </button>
            </form>
        </div>
        // </div>
    );
};

export default CourseTitlePage;
