import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createPost } from "../actions";

class PostsNew extends Component {
  renderTitleField(field) {
    const className = `form-control ${
      field.meta.touched && field.meta.error ? "is-invalid" : ""
    }`;

    return (
      <div className="form-group">
        <label>Title</label>
        <input {...field.input} className={className} type="text" />
        <div className="invalid-feedback">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }

  renderCategoryField(field) {
    return (
      <div className="form-group">
        <label>Category</label>
        <select {...field.input} className="form-control">
          <option />
          <option>React - Basics</option>
          <option>React - Router</option>
          <option>Redux - Basics</option>
          <option>Redux - Middleware</option>
          <option>Redux - Form</option>
          <option>NodeJS</option>
          <option>MongoDB</option>
        </select>
      </div>
    );
  }

  renderContentField(field) {
    return (
      <div className="form-group">
        <label>Content</label>
        <textarea
          {...field.input}
          className="form-control"
          type="text"
          rows="10"
        />
      </div>
    );
  }

  renderReferencesField(field) {
    const className = `form-control ${
      field.meta.touched && field.meta.error ? "is-invalid" : ""
    }`;
    return (
      <div className="form-group">
        <label>References</label>
        <textarea {...field.input} className={className} type="text" row="3" />
        <div className="invalid-feedback">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="title" component={this.renderTitleField} />
          <Field name="category" component={this.renderCategoryField} />
          <Field name="content" component={this.renderContentField} />
          <div>
            <label htmlFor="hasReferences">Has References?</label>
            <div>
              <Field
                name="hasReferences"
                id="hasReferences"
                component="input"
                type="checkbox"
              />
            </div>
          </div>

          {this.props.hasRefsValue && (
            <Field name="references" component={this.renderReferencesField} />
          )}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-primary">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title!";
  }

  if (values.hasRefsValue && !values.references) {
    errors.references = "Enter references";
  }
  return errors;
}

PostsNew = reduxForm({
  validate,
  form: "PostsNewForm"
})(PostsNew);

const selector = formValueSelector("PostsNewForm");
PostsNew = connect(
  state => {
    const title = selector(state, "title");
    const category = selector(state, "category");
    const content = selector(state, "content");
    const hasRefsValue = selector(state, "hasReferences");
    const refsValue = selector(state, "references");

    return {
      title,
      category,
      content,
      hasRefsValue,
      refsValue
    };
  },
  { createPost }
)(PostsNew);

export default PostsNew;
