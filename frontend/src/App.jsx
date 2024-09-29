import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/NormalUser/Home";
import Courses from "./pages/NormalUser/Courses";
import About from "./pages/NormalUser/About";
import Contact from "./pages/NormalUser/Contact";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import CourseDetails from "./pages/Course/CourseDetails";
import CourseView from "./pages/Course/CourseView";
import Cart from "./pages/Auth/Cart";
import StudentProfile from "./pages/Student/StudentProfile";
import StudentCourses from "./pages/Student/StudentCourses";
import StudentDelete from "./pages/Student/StudentDelete";
import StudentChangePassword from "./pages/Student/StudentChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutesStudent from "./components/ProtectedRoutesStudent";
import ProtectedRoutesTeacher from "./components/ProtectedRoutesTeacher";
import ProtectedRoutesAdmin from "./components/ProtectedRoutesAdmin";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import TeacherDelete from "./pages/Teacher/TeacherDelete";
import TeacherChangePassword from "./pages/Teacher/TeacherChangePassword";
import TeacherCourses from "./pages/Teacher/TeacherCourses";
import TeacherCreateCourse from "./pages/Teacher/TeacherCreateCourse";
import TeacherRevenue from "./pages/Teacher/TeacherRevenue";
import AdminChangePassword from "./pages/Admin/AdminChangePassword";
import AdminDelete from "./pages/Admin/AdminDelete";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminCourses from "./pages/Admin/AdminCourses";

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
          <Route path="/course/view/:id" element={<CourseView />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Protected Routes - Student*/}

          <Route path="" element={<ProtectedRoutesStudent />}>
            <Route
              path="/profile/student/update/:id"
              element={<StudentProfile />}
            />
            <Route
              path="/profile/student/delete/:id"
              element={<StudentDelete />}
            />
            <Route
              path="/profile/student/courses/:id"
              element={<StudentCourses />}
            />
            <Route
              path="/profile/student/password/:id"
              element={<StudentChangePassword />}
            />
          </Route>

          {/* Protected Routes - Teacher*/}

          <Route path="" element={<ProtectedRoutesTeacher />}>
            <Route
              path="/profile/teacher/update/:id"
              element={<TeacherProfile />}
            />
            <Route
              path="/profile/teacher/delete/:id"
              element={<TeacherDelete />}
            />
            <Route
              path="/profile/teacher/courses/:id"
              element={<TeacherCourses />}
            />
            <Route
              path="/profile/teacher/password/:id"
              element={<TeacherChangePassword />}
            />
            <Route
              path="/profile/teacher/createcourse/:id"
              element={<TeacherCreateCourse />}
            />
            <Route
              path="/profile/teacher/revenue/:id"
              element={<TeacherRevenue />}
            />
          </Route>

          {/* Admin Routes */}
          <Route path="" element={<ProtectedRoutesAdmin />}>
            <Route
              path="/profile/admin/update/:id"
              element={<AdminProfile />}
            />
            <Route path="/profile/admin/delete/:id" element={<AdminDelete />} />
            <Route
              path="/profile/admin/courses/:id"
              element={<AdminCourses />}
            />
            <Route
              path="/profile/admin/password/:id"
              element={<AdminChangePassword />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
