import React from "react";
import ManageCoursePage from "./ManageCoursePage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/configureStore";
import { BrowserRouter } from "react-router-dom"
import { courses, authors } from "../../../tools/mockData";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

beforeEach(() => {
    fetch.resetMocks();
})

it('sets error when attempting to save an empty title field', async () => {
    await fetch.mockResponseOnce(JSON.stringify(courses));
    await fetch.mockResponseOnce(JSON.stringify(authors));

    render(<BrowserRouter>
        <Provider store={store}>
            <ManageCoursePage />
        </Provider>
    </BrowserRouter>)

    await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeTruthy();
    });

    await fireEvent.click(screen.getByRole("button", { name: "Save" }));
    screen.getByText("Title is required.");
});
