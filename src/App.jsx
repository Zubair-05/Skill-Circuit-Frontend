// App.jsx
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Navbar from './components/Navbar';
import Footer from "./Components/Footer.jsx";
import CreateCourse from "./Pages/CreateCourse.jsx";
import CourseTitlePage from "@/Pages/CourseTitlePage.jsx";
import VideoUploadPage from "@/Pages/VideoUploadPage.jsx";


function App() {
    return (
        <Router>
            <Navbar/> {/* Add the Navbar component */}
            <div className="container mx-auto px-4 py-6">
            <Routes>
                <Route path="/" element={<CourseTitlePage/>}/>
                <Route path="/course-create/:id" element={<CreateCourse/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/courses" element={<Courses/>}/>
                <Route path="/courses/:id" element={<CourseDetails/>}/>
                <Route path='/course-create/:id/video-upload/:id1' element={<VideoUploadPage/>}/>
            </Routes>
            </div>
            <Footer/>
        </Router>
    );
}

export default App;
