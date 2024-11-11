import React from "react";
import { connect } from "react-redux"
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from 'prop-types'
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {

    state = {
        course: {
            title: ''
        }
    }

    handleChange = (e) => {
        const course = { ...this.state.course, title: e.target.value };
        this.setState({ course });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // debugger;
        console.log('Dispatching: ', this.state.course);
        this.props.actions.createCourse(courseActions.createCourse(this.state.course));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Courses</h2>
                <h3>Add Course</h3>
                <input type="text" onChange={this.handleChange} value={this.state.course.title} />
                <input type="submit" value="Save" />
                {

                    this.props.courses?.map((course, index) => (
                        <div key={index}>{course.course.title}</div>
                    ))
                }

            </form>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array,
    actions: PropTypes.object
}


function mapStateToProps(state) {
    return {
        courses: state
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// dispatch property automatically injected by using mapStateToProps