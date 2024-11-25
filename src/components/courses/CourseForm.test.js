import React from "react";
import { render, screen } from "@testing-library/react";
import CourseForm from './CourseForm';
import '@testing-library/dom';

function renderCourseForm(args) {
    let defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => { },
        onChange: () => { },
    }

    const props = { ...defaultProps, ...args };
    return render(<CourseForm {...props} />);
}

it("should render add course header", () => {
    renderCourseForm();
    screen.getByRole("heading", { name: "Add Course" });
});

it("should label save button as 'Save' when not saving", () => {
    renderCourseForm();
    screen.getByRole("button", { name: "Save" });
});

it("should label save button as 'Saving...' when saving", () => {
    renderCourseForm({ saving: true });
    screen.getByRole("button", { name: "Saving..." });
});
