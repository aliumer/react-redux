import React from "react";
import { Routes, Route} from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "../common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";

function App() {

    return (
        <div className="container-fluid">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/courses" element={<CoursesPage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path='*' exact={true} element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default App;