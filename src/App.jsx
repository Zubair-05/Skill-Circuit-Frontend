// App.jsx
import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from '@/pages/Signin.jsx';
import Signup from '@/pages/Signup.jsx';
import Courses from '@/pages/Student/Courses.jsx';
import CourseDetails from '@/pages/Student/CourseDetails.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import CreateCourse from "@/pages/Teacher/CreateCourse.jsx";
import CourseTitlePage from "@/pages/Teacher/CourseTitlePage.jsx";
import VideoUploadPage from "@/pages/Teacher/VideoUploadPage.jsx";
import StripeConnect from "@/pages/Teacher/StripeConnect.jsx";
import Cart from "@/pages/Student/Cart.jsx";
import Profile from "@/pages/Profile.jsx";
import PrivateRoutes from "./utils/PrivateRoute.jsx"
import PaymentSuccess from "@/pages/Student/PaymentSuccess.jsx";
import PaymentFailure from "@/pages/Student/PaymentFailure.jsx";
import Billing from "@/pages/Teacher/Billing.jsx"
import InstructorCourses from "@/pages/Teacher/InstructorCourses.jsx";


function App() {
    const [isTeacherMode, setIsTeacherMode] = useState(false); // State for toggling modes
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <Router>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <Routes>

                    {/* Protected routes */}
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<PrivateRoutes />}>
                        {/*Techer mode*/}
                        <Route path="/teacher/create-course" element={<CourseTitlePage />} />
                        <Route path="/teacher/course-create/:id" element={<CreateCourse />} />
                        <Route path='/teacher/course-create/:id/video-upload/:id1' element={<VideoUploadPage />} />
                        <Route path="/teacher/billing" element={<Billing/>} />
                        <Route path="/teacher" element={<InstructorCourses/>} />
                        {/*student mode*/}
                        <Route path="/" element={<Courses />} />
                        <Route path="/courses/:id" element={<CourseDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/payment/success" element={<PaymentSuccess />} />
                        <Route path="/payment/failure" element={<PaymentFailure />} />
                    </Route>
                </Routes>
            </div>
        </Router>

    );
}

export default App;
