import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

// this file will hold our course related action creaters.

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCoursesSuccess(course) {
    return { type: types.UPDATE_COURSES_SUCCESS, course };
}

export function createCoursesSuccess(courses) {
    return { type: types.CREATE_COURSES_SUCCESS, courses };
}

function deleteCourseOptimistic(course) {
    return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.getCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            dispatch(apiCallError(error))
            throw error;
        })
    }
}

export function saveCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCoursesSuccess(savedCourse)) : dispatch(createCoursesSuccess(savedCourse));
        }).catch(error => {
            dispatch(apiCallError(error))
            throw error;
        })
    }
}

export function deleteCourse(course) {
    return function (dispatch) {
        dispatch(deleteCourseOptimistic(course))
        return courseApi.deleteCourse(course.id);
    }
}