import React, { useState } from 'react';

function CourseDetails() {
    const course = {
        title: "Advanced Web Development with React",
        description: "Master modern web development with advanced techniques in React, including hooks, state management, and deployment strategies.",
        price: "$99.99",
        duration: "12 weeks",
        instructor: {
            name: "John Doe",
            bio: "John is a senior software engineer with over 10 years of experience specializing in web technologies, particularly React. His courses focus on practical, real-world skills that lead to tangible career outcomes."
        },
        curriculum: [
            {
                chapterTitle: "Chapter 1: Introduction to React",
                modules: [
                    { title: "What is React?", description: "Overview of React and its significance in modern web development." },
                    { title: "Setting Up the Development Environment", description: "Learn how to set up a React development environment effectively." },
                    { title: "JSX and Components", description: "Understanding JSX syntax and the concept of components in React." }
                ]
            },
            {
                chapterTitle: "Chapter 2: Advanced Component Patterns",
                modules: [
                    { title: "Higher-Order Components", description: "Explore how to reuse component logic with higher-order components." },
                    { title: "Render Props", description: "Learn to share code across components with render props technique." },
                    { title: "Hooks", description: "Dive deep into React Hooks and how they simplify state management and side effects." }
                ]
            },
            {
                chapterTitle: "Chapter 3: State Management with Redux",
                modules: [
                    { title: "Introduction to Redux", description: "Get started with Redux for state management in React applications." },
                    { title: "Integrating Redux with React", description: "Learn how to integrate Redux in your React projects effectively." }
                ]
            },
            {
                chapterTitle: "Chapter 4: Testing and Deployment",
                modules: [
                    { title: "Unit Testing with Jest", description: "Write unit tests for your React components using Jest to ensure reliability." },
                    { title: "End-to-End Testing", description: "Learn about end-to-end testing with tools like Cypress for comprehensive coverage." },
                    { title: "Deploying React Apps", description: "Best practices for deploying React applications to production environments." }
                ]
            }
        ],
        learningOutcomes: [
            "Build and scale complex web applications using React.",
            "Effectively manage state in large applications with Redux and Context API.",
            "Implement advanced component patterns and hooks.",
            "Deploy production-ready applications with best practices.",
            "Understand and apply testing techniques for React applications."
        ]
    };

    const [openChapters, setOpenChapters] = useState({});

    const toggleChapter = (index) => {
        setOpenChapters(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="container mx-auto p-6">
            <div className="md:flex md:gap-8">
                <div className="md:w-3/4">
                    <h1 className="text-3xl font-semibold mb-4">{course.title}</h1>
                    <p className="mb-4 text-gray-700">{course.description}</p>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Course Duration</h2>
                        <p className="text-gray-800">{course.duration}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">What You'll Learn</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {course.learningOutcomes.map((outcome, index) => (
                                <li key={index}>{outcome}</li>
                            ))}
                        </ul>
                    </div>
                    {course.curriculum.map((chapter, index) => (
                        <div key={index} className="mb-4">
                            <button
                                onClick={() => toggleChapter(index)}
                                className="w-full text-left text-xl font-semibold text-blue-600 py-2 flex justify-between items-center"
                            >
                                {chapter.chapterTitle}
                                <span className="font-medium text-gray-600">{openChapters[index] ? '-' : '+'}</span>
                            </button>
                            {openChapters[index] && (
                                <div className="mt-2 pl-4">
                                    {chapter.modules.map((module, modIndex) => (
                                        <div key={modIndex} className="mb-3">
                                            <h4 className="text-lg font-semibold">{module.title}</h4>
                                            <p className="text-gray-600">{module.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Instructor</h2>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-12 bg-gray-300 rounded-full"></div>
                            <div>
                                <p className="font-semibold">{course.instructor.name}</p>
                                <p className="text-gray-700">{course.instructor.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/4 sticky top-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center mb-4">Enroll Now</h2>
                        <p className="text-xl text-center font-semibold mb-4">{course.price}</p>
                        <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors text-lg">
                            Buy This Course
                        </button>
                        <p className="mt-4 text-center text-gray-600">30-Day Money-Back Guarantee</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;
