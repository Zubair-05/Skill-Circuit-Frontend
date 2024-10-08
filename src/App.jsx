// App.jsx
import {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Navbar from './components/Navbar';
import Footer from "./Components/Footer";
import CreateCourse from "./Pages/CreateCourse";
import CourseTitlePage from "@/Pages/CourseTitlePage";
import VideoUploadPage from "@/Pages/VideoUploadPage";
import StripeConnect from "@/Pages/StripeConnect";
import Cart from "@/Pages/Cart";
import Profile from "@/Pages/Profile";

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
