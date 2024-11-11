import * as types from "./actionTypes";
// this file will hold our course related action creaters.

export function createCourse(course) {
    // debugger;
    return {
        type: types.CREATE_COURSE,
        course: course
    }
}
