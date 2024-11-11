import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../redux/actions/courseActions";

const CoursesPage = () => {

    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses);

    const [course, setCourse] = useState({
        title: ''
    })

    const handleChange = (e) => {
        setCourse({ ...this.state.course, title: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // debugger;
        console.log('Dispatching: ', course);
        dispatch(actions.createCourse(course));
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Courses</h2>
            <h3>Add Course</h3>
            <input type="text" onChange={handleChange} value={course.title} />
            <input type="submit" value="Save" />
            {
                courses?.map((course, index) => (
                    <div key={index}>{course.title}</div>
                ))
            }

        </form>
    )
}

export default CoursesPage;
// dispatch property automatically injected by using mapStateToProps
