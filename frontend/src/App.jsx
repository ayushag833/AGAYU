import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/User/Home";
import Courses from "./pages/User/Courses";
import About from "./pages/User/About";
import Contact from "./pages/User/Contact";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import CourseDetails from "./pages/Course/CourseDetails";
import Cart from "./pages/Auth/Cart";
import StudentProfile from "./pages/Student/StudentProfile";
import StudentCourses from "./pages/Student/StudentCourses";
import StudentInfo from "./pages/Student/StudentInfo";
import StudentDelete from "./pages/Student/StudentDelete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutesStudent from "./components/ProtectedRoutesStudent";
import ProtectedRoutesTeacher from "./components/ProtectedRoutesTeacher";
import ProtectedRoutesAdmin from "./components/ProtectedRoutesAdmin";
import TeacherProfile from "./pages/Teacher/TeacherProfile";

const App = () => {
  return (
    <div className="bg-slate-900 w-full min-h-screen">
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Protected Routes - Student*/}

          <Route path="" element={<ProtectedRoutesStudent />}>
            <Route
              path="/profile/student/update"
              element={<StudentProfile />}
            />
            <Route path="/profile/student/delete" element={<StudentDelete />} />
            <Route
              path="/profile/student/courses"
              element={<StudentCourses />}
            />
            <Route
              path="/profile/student/information"
              element={<StudentInfo />}
            />
          </Route>

          {/* Protected Routes - Teacher*/}

          <Route path="" element={<ProtectedRoutesTeacher />}>
            <Route
              path="/profile/teacher/update"
              element={<TeacherProfile />}
            />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoutesAdmin />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
