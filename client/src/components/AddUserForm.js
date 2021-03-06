import React from "react";
import { Box, ButtonOutline as Btn, Flex, Text } from "rebass";
import { navigate } from "@reach/router";
import * as Yup from "yup";
import styled from "styled-components";
import { withFormik } from "formik";
// import DisplayFormikState from "./DisplayFormikState";

const postData = (url = "", data = {}) =>
  fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(responseText => responseText.json()) // parses response to JSON
    // .then(response => this.setState(response))
    .catch(error => ({ errors: { msg: error.message } }));

const ButtonOutline = styled(Btn)`
  background-color: transparent;
  border-color: #1000ee;
  transition: all 0.16s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #1000ee;
    border-color: #1000ee;
  }
  &:focus {
    box-shadow: rgb(0, 103, 238) 0px 0px 0px 2px;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.25;
  border-radius: 0.25rem;
  transition: all 0.15s ease-in-out;
  color: #007bff;
  background-color: transparent;
  background-image: none;
  border-color: #007bff;
  &:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
`;

const StyledInput = styled.input`
  clear: both;
  width: 100%;
  border: 4px solid #ecf0f1;
  border-left: none;
  border-right: none;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 0;
  background: #ecf0f1;
  display: block;
  font-size: 16px;
  transition: background 1s, border 1s;
  &:hover {
    border-bottom: 4px solid #df6659;
  }
  &:focus {
    border-bottom: 4px solid #df6659;
  }
`;

const StyledInputLabel = styled.label`
  display: block;
`;

const ErrorLabel = styled.span`
  display: inline-block;
`;

const UriForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    hanldeBlur,
    handleSubmit,
    handleReset,
    hash,
    status
  } = props;

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <div>
          {/* <StyledInputLabel htmlFor="_id">User ID</StyledInputLabel> */}
          <StyledInput
            name="username"
            type="text"
            className={`form-control ${errors.username &&
              touched._id &&
              "is-invalid"}`}
            value={values.username || ""}
            placeholder="Username"
            onChange={handleChange}
          />
          <div>{values.hash}</div>
          {errors.username &&
            touched.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
        </div>

        {/* <SubmitButton type="submit">
          {isSubmitting ? "WAIT PLZ" : "SUBMIT"}
        </SubmitButton> */}
        <ButtonOutline mx={1} my={3} color="indigo">
          {isSubmitting ? "WAIT PLEASE" : "SUBMIT"}
        </ButtonOutline>
        {/* <DisplayFormikState {...props} /> */}
      </form>
      <h4>
        {status ? (
          <div>
            <Text color="white">User Added</Text>
            <a
              href={`/api/exercise/log?${status.username}`}
              style={{ color: "yellow" }}
            >
              {`${window.location.origin}/api/exercise/log?${status._id}`}
            </a>
          </div>
        ) : (
          <div />
        )}
      </h4>
    </div>
  );
};

export default withFormik({
  validationSchema: Yup.object().shape({
    // uri: Yup.string()
    //   .url("Invalid URI format")
    //   .required("A valid link is required")
    //       .test(
    //         'is-google',
    //       <ErrorLabel>
    // Uhhh this isn't google
    //       </ErrorLabel>,
    //       value => value === 'http://www.google.com'
    //       )
  }),

  handleSubmit: (
    values,
    { resetForm, setStatus, setErrors, setSubmitting }
  ) => {
    postData("/api/exercise/new-user", values)
      .then(data => {
        // return data;
        if (data.errors) {
          return () => {
            this.setState({ errors: { msg: data.errors } }, () =>
              console.error(`state in 'then-if' ${this.state}`)
            );
          };
        }
        console.log(data);
        resetForm({});

        navigate(`/exercise/log?_id=${data._id}`);
      })
      .catch(error => console.error(error));
    setSubmitting(false);
  }
})(UriForm);
