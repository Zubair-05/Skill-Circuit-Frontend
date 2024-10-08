// App.jsx
import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from '@/pages/Signin.jsx';
import Signup from '@/pages/Signup.jsx';
import Courses from '@/pages/Courses.jsx';
import CourseDetails from '@/pages/CourseDetails.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from "./Components/Footer.jsx";
import CreateCourse from "@/pages/CreateCourse.jsx";
import CourseTitlePage from "@/pages/CourseTitlePage.jsx";
import VideoUploadPage from "@/pages/VideoUploadPage.jsx";
import StripeConnect from "@/pages/StripeConnect.jsx";
import Cart from "@/pages/Cart.jsx";
import Profile from "@/pages/Profile.jsx";

function App() {
    const [isTeacherMode, setIsTeacherMode] = useState(false); // State for toggling modes
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <Router>
            <Navbar/> {/* Add the Navbar component */}
            <div className="container mx-auto px-4 py-6">

            <Routes>
                <Route path="/create-course" element={<CourseTitlePage/>}/>
                <Route path="/course-create/:id" element={<CreateCourse/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/stripe-connect" element={<StripeConnect/>}/>
                <Route path="/courses" element={<Courses/>}/>
                <Route path="/courses/:id" element={<CourseDetails/>}/>
                <Route path='/course-create/:id/video-upload/:id1' element={<VideoUploadPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
            </Routes>
            </div>
            <Footer/>
        </Router>
    );
}

export default App;
