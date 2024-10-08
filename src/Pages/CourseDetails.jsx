/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FN358ZflLQz
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {getApiCall} from "@/utils/apiHelper.js";

const CourseDetails = () => {

    const [course, setCourse] = useState({});

    const fetchCourse = async () => {
        try{
            const path = window.location.pathname;
            const courseId = path.split('/').pop();
            const respsonse = await getApiCall(`/courses/${courseId}`)
            setCourse(respsonse?.data);
        } catch (err){
            console.log(err)
        }
    }


    return (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-4 md:gap-10 items-start">
                <div>
                    <h1 className="font-bold text-3xl lg:text-4xl">Introduction to Web Development</h1>
                    <p className="text-muted-foreground mt-2">
                        Learn the fundamentals of web development, including HTML, CSS, and JavaScript.
                    </p>
                </div>
                <div className="grid gap-4">
                    <div>
                        <h2 className="font-bold text-xl">Course Content</h2>
                        <ul className="mt-2 space-y-2 text-muted-foreground">
                            <li>
                                <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                                Introduction to HTML
                            </li>
                            <li>
                                <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                                Styling with CSS
                            </li>
                            <li>
                                <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                                Interactivity with JavaScript
                            </li>
                            <li>
                                <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                                Responsive Web Design
                            </li>
                            <li>
                                <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                                Web Development Best Practices
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm leading-loose">
                        <p>
                            In this course, you'll learn the fundamental technologies that power the web. You'll start with HTML, the
                            markup language used to structure web pages, and then move on to CSS, the language used to style those
                            pages. Finally, you'll dive into JavaScript, the programming language that adds interactivity and dynamic
                            behavior to websites.
                        </p>
                        <p className="mt-4">
                            By the end of the course, you'll have a solid understanding of how to build responsive, accessible, and
                            user-friendly websites. Whether you're a complete beginner or have some prior experience, this course will
                            provide you with the skills and knowledge you need to start your journey as a web developer.
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid gap-4">
                <img
                    src="/placeholder.svg"
                    alt="Course Thumbnail"
                    width={600}
                    height={400}
                    className="aspect-[3/2] object-cover rounded-lg"
                />
                <Card>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-xl">Introduction to Web Development</h3>
                            <div className="text-4xl font-bold">$99</div>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg">Add to Cart</Button>
                            <Button size="lg">Buy Now</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

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
    )
}

export default CourseDetails;