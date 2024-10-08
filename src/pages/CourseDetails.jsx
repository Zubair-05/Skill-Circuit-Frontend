import React, { useEffect, useState } from "react";
import {getApiCall, postApiCall} from "@/utils/apiHelper.js";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

const CourseDetails = () => {
    const navigate = useNavigate();

    const [course, setCourse] = useState({});
    const path = window.location.pathname;
    const courseId = path.split("/").pop();

    const fetchCourse = async () => {
        try {

            const response = await getApiCall(`/courses/${courseId}`);
            setCourse(response?.data?.course);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleAddToCart = async () => {
        try{
            const response = await postApiCall(`/cart/add/${courseId}`);
            navigate('/cart');
        } catch (err){
            console.log(err);
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            {/* Left Section: Course Details */}
            <div className="grid gap-4 md:gap-10 items-start">
                <div>
                    <h1 className="font-bold text-3xl lg:text-4xl">{course.title}</h1>
                    <p className="text-muted-foreground mt-2">{course.description}</p>
                </div>

                {/* Course Content */}
                <div className="grid gap-4">
                    <div>
                        <h2 className="font-bold text-xl">Course Content</h2>
                        <ul className="mt-2 space-y-2 text-muted-foreground">
                            {course.modules?.map((module) => (
                                <li key={module.id} className="flex items-center">
                                    <CheckIcon className="w-4 h-4 mr-2" />
                                    <span className="font-medium">{module.title}</span>
                                    {module.isFree && (
                                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      Free
                    </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Additional Course Description */}
                    <div className="text-sm leading-loose">
                        <p>
                            This course is designed to provide you with advanced knowledge in web development. With topics ranging from state
                            management to Redux Toolkit, this course will equip you with the skills to build complex and scalable web applications.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section: Course Purchase Options */}
            <div className="grid gap-4">
                <img
                    src={course.thumbnail}
                    alt="Course Thumbnail"
                    width={600}
                    height={400}
                    className="aspect-[3/2] object-cover rounded-lg"
                />
                <Card>
                    <CardContent className="grid gap-4 p-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-2xl">{course.title}</h3>
                            <div className="text-2xl font-bold">₹{course.price}</div>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button
                                onClick={handleAddToCart}
                                size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                                Add to Cart
                            </Button>
                            <Button size="lg" className="bg-green-600 hover:bg-green-700">
                                Buy Now
                            </Button>
                        </div>
                        {/* Teacher Information */}
                        {course.teacher && (
                            <div className="mt-4 flex items-center space-x-4">
                                <img
                                    src={course.teacher.profilePicture}
                                    alt={course.teacher.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="text-lg font-medium">{course.teacher.name}</h4>
                                    <p className="text-muted-foreground text-sm">{course.teacher.email}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

function CheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

export default CourseDetails;
