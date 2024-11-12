import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    return (
        <div className="container-fluid">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/courses" element={<CoursesPage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/course/:slug?" element={<ManageCoursePage />}></Route>
                <Route path='*' exact={true} element={<PageNotFound />} />
            </Routes>
            <ToastContainer autoClose={3000} hideProgressBar theme="colored" />
        </div>
    )
}

export default App;