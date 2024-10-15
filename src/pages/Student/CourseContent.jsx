import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApiCall } from '@/utils/apiHelper'; // Assume this helper is for making API calls

const CourseContent = () => {
    const { courseId } = useParams(); // Get the course ID from the URL params
    const [course, setCourse] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null); // Track the selected module
    const [loading, setLoading] = useState(true);

    // Fetch the course content
    const fetchCourseContent = async () => {
        try {
            const response = await getApiCall(`/course/content/${courseId}`); // Adjust API endpoint
            setCourse(response.data);
            if (response.data.modules.length > 0) {
                setSelectedModule(response.data.modules[0]); // Set the first module as default
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching course content:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseContent();
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-6">
            {course ? (
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column: Module List */}
                    <div className="md:w-1/4 bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4">Modules</h2>
                        <ul className="space-y-4">
                            {course.modules.map((module) => (
                                <li
                                    key={module._id}
                                    className={`p-2 cursor-pointer rounded-lg transition duration-200 ease-in-out ${
                                        selectedModule && selectedModule._id === module._id
                                            ? 'bg-blue-100 font-semibold'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                    onClick={() => setSelectedModule(module)}
                                >
                                    {module.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Column: Video Player */}
                    <div className="md:w-3/4 bg-white shadow-md rounded-lg p-6 flex flex-col">
                        {selectedModule ? (
                            <>
                                <h2 className="text-2xl font-semibold mb-4">{selectedModule.title}</h2>
                                {selectedModule.videoUrl ? (
                                    <div className="relative" style={{paddingBottom: '56.25%'}}>
                                        <video
                                            src={`${selectedModule.videoUrl}`}
                                            className="absolute inset-0 w-full h-full rounded-lg object-cover"
                                            controls
                                            controlsList="nodownload"
                                        />
                                    </div>
                                ) : (
                                    <p>No video available for this module</p>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500">Select a module to start learning</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-center text-red-500">Course not found</p>
            )}
        </div>
    );
};

export default CourseContent;
