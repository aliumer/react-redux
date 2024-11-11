// this file will hold our course related action creaters.

export function createCourse(course) {
    return {
        type: "CREATE_COURCE",
        course: course
    }
}
