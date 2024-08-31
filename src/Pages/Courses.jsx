import React from 'react';
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

function Courses() {
    // Course data with 13 courses
    const courses = [
        {
            id: 1,
            title: "React for Beginners",
            price: "$49.99",
            description: "Learn the basics of React and build dynamic web applications.",
            imageUrl: "https://via.placeholder.com/300x200?text=React+Course",
            instructorName: "John Doe",
            instructorImage: "https://via.placeholder.com/40x40?text=JD",
            rating: 4.5,
            numRatings: 150
        },
        {
            id: 2,
            title: "Advanced Node.js",
            price: "$59.99",
            description: "Master Node.js and build scalable backend applications.",
            imageUrl: "https://via.placeholder.com/300x200?text=Node.js+Course",
            instructorName: "Jane Smith",
            instructorImage: "https://via.placeholder.com/40x40?text=JS",
            rating: 4.7,
            numRatings: 200
        },
        {
            id: 3,
            title: "Fullstack JavaScript",
            price: "$79.99",
            description: "Become a full-stack JavaScript developer with hands-on projects.",
            imageUrl: "https://via.placeholder.com/300x200?text=Fullstack+JS+Course",
            instructorName: "Alice Johnson",
            instructorImage: "https://via.placeholder.com/40x40?text=AJ",
            rating: 4.6,
            numRatings: 180
        },
        {
            id: 4,
            title: "Python for Data Science",
            price: "$69.99",
            description: "Dive into data science with Python and learn data analysis techniques.",
            imageUrl: "https://via.placeholder.com/300x200?text=Python+Course",
            instructorName: "Bob Brown",
            instructorImage: "https://via.placeholder.com/40x40?text=BB",
            rating: 4.8,
            numRatings: 220
        },
        {
            id: 5,
            title: "Machine Learning Masterclass",
            price: "$89.99",
            description: "Explore the world of machine learning and build predictive models.",
            imageUrl: "https://via.placeholder.com/300x200?text=ML+Course",
            instructorName: "Charlie Davis",
            instructorImage: "https://via.placeholder.com/40x40?text=CD",
            rating: 4.9,
            numRatings: 300
        },
        {
            id: 6,
            title: "Web Design Essentials",
            price: "$39.99",
            description: "Learn the fundamentals of web design and create stunning websites.",
            imageUrl: "https://via.placeholder.com/300x200?text=Web+Design+Course",
            instructorName: "Diana Evans",
            instructorImage: "https://via.placeholder.com/40x40?text=DE",
            rating: 4.4,
            numRatings: 130
        },
        {
            id: 7,
            title: "Blockchain Basics",
            price: "$74.99",
            description: "Understand the principles of blockchain and its applications.",
            imageUrl: "https://via.placeholder.com/300x200?text=Blockchain+Course",
            instructorName: "Eve Foster",
            instructorImage: "https://via.placeholder.com/40x40?text=EF",
            rating: 4.5,
            numRatings: 160
        },
        {
            id: 8,
            title: "Introduction to Cybersecurity",
            price: "$64.99",
            description: "Protect your online presence with foundational cybersecurity skills.",
            imageUrl: "https://via.placeholder.com/300x200?text=Cybersecurity+Course",
            instructorName: "Frank Green",
            instructorImage: "https://via.placeholder.com/40x40?text=FG",
            rating: 4.6,
            numRatings: 170
        },
        {
            id: 9,
            title: "Cloud Computing with AWS",
            price: "$99.99",
            description: "Get started with AWS and cloud computing for scalable solutions.",
            imageUrl: "https://via.placeholder.com/300x200?text=AWS+Course",
            instructorName: "Grace Hall",
            instructorImage: "https://via.placeholder.com/40x40?text=GH",
            rating: 4.7,
            numRatings: 190
        },
        {
            id: 10,
            title: "Digital Marketing Strategies",
            price: "$59.99",
            description: "Learn effective digital marketing strategies to grow your business.",
            imageUrl: "https://via.placeholder.com/300x200?text=Digital+Marketing+Course",
            instructorName: "Henry Ives",
            instructorImage: "https://via.placeholder.com/40x40?text=HI",
            rating: 4.3,
            numRatings: 140
        },
        {
            id: 11,
            title: "iOS Development with Swift",
            price: "$89.99",
            description: "Build beautiful and functional iOS apps using Swift and Xcode.",
            imageUrl: "https://via.placeholder.com/300x200?text=iOS+Development+Course",
            instructorName: "Ivy Johnson",
            instructorImage: "https://via.placeholder.com/40x40?text=IJ",
            rating: 4.8,
            numRatings: 210
        },
        {
            id: 12,
            title: "UI/UX Design Principles",
            price: "$69.99",
            description: "Create user-friendly interfaces with key UI/UX design principles.",
            imageUrl: "https://via.placeholder.com/300x200?text=UIUX+Course",
            instructorName: "Jack King",
            instructorImage: "https://via.placeholder.com/40x40?text=JK",
            rating: 4.7,
            numRatings: 180
        },
        {
            id: 13,
            title: "Game Development with Unity",
            price: "$79.99",
            description: "Start your game development journey with Unity and C#.",
            imageUrl: "https://via.placeholder.com/300x200?text=Unity+Course",
            instructorName: "Kara Lewis",
            instructorImage: "https://via.placeholder.com/40x40?text=KL",
            rating: 4.6,
            numRatings: 190
        },
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm">
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <img
                                    src={course.instructorImage}
                                    alt={course.instructorName}
                                    className="w-10 h-10 rounded-full border border-gray-300"
                                />
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold">{course.title}</h2>
                                    <p className="text-gray-500 text-sm">{course.instructorName}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                            <div className="flex items-center mb-4">
                                <span className={"text-sm"}>{course.rating}</span>
              <span className="text-yellow-500">
                {'★'.repeat(Math.round(course.rating))}{'☆'.repeat(5 - Math.round(course.rating))}
              </span>
                                <span className="text-gray-500 text-xs ml-2">{(`${course.numRatings}`)} ratings</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">{course.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;
