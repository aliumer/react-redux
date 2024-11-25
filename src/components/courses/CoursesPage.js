import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses.loadCourses().catch(error => {
        alert("Loading Course Error: " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors.loadAuthors().catch(error => {
        alert("Loading Authors Error: " + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success("Course deleted successfully.");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delet failed with errors: " + error.message, {
        autoClose: false
      });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Navigate to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList courses={this.props.courses} />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array,
  courses: PropTypes.array,
  actions: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
          return {
            ...course,
            authorName: state.authors.find(a => a.id === course.authorId).name
          };
        }),
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions, dispatch),
      loadAuthors: bindActionCreators(authorActions, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// dispatch property automatically injected by using mapStateToProps
