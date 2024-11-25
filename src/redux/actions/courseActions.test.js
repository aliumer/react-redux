import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData"

// to test mock
import { thunk } from "redux-thunk";
import fetchMock from "jest-fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe("Load Courses Thunk", () => {
        it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
            fetchMock.mockAbort("*", {
                body: courses,
                headers: { "content-type": "application/json" }
            });

            const expectedActions = [
                { type: types.BEGIN_API_CALL },
                { type: types.LOAD_COURSES_SUCCESS, courses },
            ];

            const store = mockStore({ courses: [] });
            return store.dispatch(courseActions.loadCourses()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
        })
    })
})

describe("createCourseSuccess", () => {
    it("should create CREATE_COURSE_SUCCESS action", () => {
        // arrange
        const course = courses[0];
        const expectedAction = {
            type: types.CREATE_COURSES_SUCCESS,
            course,
        };

        //act
        const action = courseActions.createCoursesSuccess(course);

        // assert
        expect(action).toEqual(expectedAction);
    })
})