import React, { useEffect, useState } from "react";

import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthors } from "../../redux/actions/authorActions";
import { useNavigate, useParams } from "react-router-dom";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export default function ManageCoursePage() {
  const courses = useSelector(state => state.courses);
  const authors = useSelector(state => state.authors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(newCourse);
  const { slug } = useParams();
  const [saving, setSaving] = useState(false);
  const [errors, setError] = useState();

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses()).catch(error =>
        alert("Loading courses failed: " + error)
      );
    } else {
      if (slug) {
        setCourse(courses.find(c => c.slug === slug) || newCourse);
      }
    }
  }, [courses, slug]);

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(loadAuthors()).catch(error => {
        alert("Loading authors failed: " + error);
      });
    }
  }, [authors]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};
    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author Id is required.";
    if (!category) errors.category = "Category is required.";

    setError(errors);

    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid) return;
    setSaving(true);
    dispatch(saveCourse(course))
      .then(() => {
        toast.success("Course saved!");
        navigate("/courses");
      })
      .catch(error => {
        setSaving(false);
        setError({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      authors={authors}
      course={course}
      errors={errors}
      saving={saving}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}
