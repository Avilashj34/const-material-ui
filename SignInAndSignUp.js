import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Formik } from "formik";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";

import { BlueGradientButton } from "../components/Buttons";
import {
  RotatingCard,
  CardWithHeader,
  BackCard,
  FrontCard,
} from "../components/Cards";
import axios from "../api/axios";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../features/SnackBar/snackbarSlice";
import { logout, setUserName } from "../features/User/userSlice";

const statusCodeArray = [401, 403, 404, 409, 422]

const emailRegex = /^(?=.{1,81}$)[\w.-]+@[\w.-]+\.\w{2,4}$/;
const mobileNumberRegex = /^\d{10}$/;
const nameRegex = /^[A-Za-z]{0,20}$/;

const loginInitialValues = {
  email: "",
  password: "",
};

const registerInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  number: "",
  firstName: "",
  lastName: "",
};

const loginValidate = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!mobileNumberRegex.test(values.email)) {
    errors.email = "Invalid Email";
  }
  if (!values.password) {
    errors.password = "Required";
  } 
  // else if (!passwordRegex.test(values.password)) {
  //   errors.password = "Invalid Password";
  // }
  return errors;
};

const registerValidate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid Email";
  }
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (!nameRegex.test(values.firstName)) {
    errors.firstName = "Invalid First Name";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (!nameRegex.test(values.lastName)) {
    errors.lastName = "Invalid Last Name";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  // else if (!passwordRegex.test(values.password)) {
  //   errors.password =
  //     "Password must contain atleast one capital and number and must be 8 character long";
  // }
  if (values.number && !mobileNumberRegex.test(values.number)) {
    errors.number = "Invald number";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Confirm Password doesnt match with Password";
  }
  return errors;
};

function SignInAndSignUp() {
  const dispatch = useDispatch();
  dispatch(logout());
  let navigate = useNavigate();
  const registerOnSubmit = (values) => {
    axios
      .post("/auth/register", {
        username: values.email,
        password: values.password,
        number: values.number,
        firstName: values.firstName,
        lastName: values.lastName,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch(
            showSuccessSnackbar("Please Check Your Email for Verification")
          );
          setrotate(!rotate);
        }
      })
      .catch((error) => {
        try {
          const isArray = Array.isArray(error.response.data.detail);
          let errorMessage;
          if (isArray) {
            errorMessage = error.response.data.detail[0].msg;
          } else {
            errorMessage = error.response.data.detail;
          }
          if (statusCodeArray.includes(error.response.status)) {
            dispatch(showErrorSnackbar(errorMessage));
          } else {
            dispatch(showErrorSnackbar("Something went wrong.Please try again!!"));
          }
        } catch (error) {
          dispatch(showErrorSnackbar("Something went wrong.Please try again!!"));
        }
      });
  };

  const loginOnSubmit = (values) => {
    axios
      .post("/auth/login", {
        username: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(setUserName(values.email));
          navigate("/home/siteList");
        }
      })
      .catch((error) => {
        try {
          const isArray = Array.isArray(error.response.data.detail);
          let errorMessage;
          if (isArray) {
            errorMessage = error.response.data.detail[0].msg;
          } else {
            errorMessage = error.response.data.detail;
          }
          if (statusCodeArray.includes(error.response.status)) {
            dispatch(showErrorSnackbar(errorMessage));
          } else {
            dispatch(showErrorSnackbar("Something went wrong.Please try again!!"));
          }
        } catch (error) {
          dispatch(showErrorSnackbar("Something went wrong.Please try again!!"));
        }
      });
  };

  const [rotate, setrotate] = useState(false);
  return (
    <Container>
      <Box
        px={1}
        width="100%"
        height="100vh"
        mx="auto"
        position="relative"
        zIndex={2}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <RotatingCard rotate={rotate}>
              {!rotate && (
                <FrontCard>
                  <CardWithHeader title={"Sign In"}>
                    <Formik
                      initialValues={loginInitialValues}
                      validate={loginValidate}
                      onSubmit={loginOnSubmit}
                    >
                      {(props) => (
                        <Box
                          pt={4}
                          pb={3}
                          px={3}
                          mt={10}
                          onSubmit={props.handleSubmit}
                          component="form"
                          role="form"
                        >
                          <Box mb={2}>
                            <TextField
                              variant="outlined"
                              name="email"
                              type="text"
                              label="Email"
                              fullWidth
                              {...props.getFieldProps("email")}
                              error={
                                props.touched.email &&
                                Boolean(props.errors.email)
                              }
                              helperText={
                                props.touched.email && props.errors.email
                              }
                            />
                          </Box>
                          <Box mb={2}>
                            <TextField
                              variant="outlined"
                              name="password"
                              type="password"
                              label="Password"
                              fullWidth
                              {...props.getFieldProps("password")}
                              error={
                                props.touched.password &&
                                Boolean(props.errors.password)
                              }
                              helperText={
                                props.touched.password && props.errors.password
                              }
                            />
                          </Box>
                          <Box mt={4} mb={1}>
                            <BlueGradientButton
                              variant="contained"
                              type="submit"
                              fullWidth
                            >
                              sign in
                            </BlueGradientButton>
                          </Box>
                          
                        </Box>
                      )}
                    </Formik>
                  </CardWithHeader>
                </FrontCard>
              )}
              {rotate && (
                <BackCard>
                  <CardWithHeader title={"Sign Up"}>
                    <Formik
                      initialValues={registerInitialValues}
                      validate={registerValidate}
                      onSubmit={registerOnSubmit}
                    >
                      {(props) => (
                        <Box
                          pt={4}
                          pb={3}
                          px={3}
                          mt={10}
                          onSubmit={props.handleSubmit}
                          component="form"
                          role="form"
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box mb={2}>
                                <TextField
                                  variant="outlined"
                                  name="firstName"
                                  type="text"
                                  label="First Name"
                                  required
                                  fullWidth
                                  {...props.getFieldProps("firstName")}
                                  error={
                                    props.touched.firstName &&
                                    Boolean(props.errors.firstName)
                                  }
                                  helperText={
                                    props.touched.firstName &&
                                    props.errors.firstName
                                  }
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box mb={2}>
                                <TextField
                                  variant="outlined"
                                  name="lastName"
                                  type="text"
                                  label="Last Name"
                                  required
                                  fullWidth
                                  {...props.getFieldProps("lastName")}
                                  error={
                                    props.touched.lastName &&
                                    Boolean(props.errors.lastName)
                                  }
                                  helperText={
                                    props.touched.lastName &&
                                    props.errors.lastName
                                  }
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Box mb={2}>
                            <TextField
                              variant="outlined"
                              name="email"
                              type="email"
                              label="Email"
                              fullWidth
                              required
                              {...props.getFieldProps("email")}
                              error={
                                props.touched.email &&
                                Boolean(props.errors.email)
                              }
                              helperText={
                                props.touched.email && props.errors.email
                              }
                            />
                          </Box>
                          <Box mb={2}>
                            <TextField
                              variant="outlined"
                              name="number"
                              type="tel"
                              label="Mobile Number"
                              fullWidth
                              {...props.getFieldProps("number")}
                              error={
                                props.touched.number &&
                                Boolean(props.errors.number)
                              }
                              helperText={
                                props.touched.number && props.errors.number
                              }
                            />
                          </Box>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box>
                                <TextField
                                  variant="outlined"
                                  name="password"
                                  type="password"
                                  label="Password"
                                  required
                                  fullWidth
                                  {...props.getFieldProps("password")}
                                  error={
                                    props.touched.password &&
                                    Boolean(props.errors.password)
                                  }
                                  helperText={
                                    props.touched.password &&
                                    props.errors.password
                                  }
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box>
                                <TextField
                                  variant="outlined"
                                  name="confirmPassword"
                                  type="password"
                                  required
                                  label="Confirm Password"
                                  fullWidth
                                  {...props.getFieldProps("confirmPassword")}
                                  error={
                                    props.touched.confirmPassword &&
                                    Boolean(props.errors.confirmPassword)
                                  }
                                  helperText={
                                    props.touched.confirmPassword &&
                                    props.errors.confirmPassword
                                  }
                                />
                              </Box>
                            </Grid>
                          </Grid>

                          <Box mt={4} mb={1}>
                            <BlueGradientButton
                              variant="contained"
                              type="submit"
                              fullWidth
                            >
                              sign up
                            </BlueGradientButton>
                          </Box>
                          <Box mt={3} mb={1} textAlign="center">
                            <Typography variant="body1">
                              Have an account?
                            </Typography>
                            <Button
                              variant="text"
                              onClick={() => {
                                setrotate(!rotate);
                              }}
                            >
                              Sign In
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Formik>
                  </CardWithHeader>
                </BackCard>
              )}
            </RotatingCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignInAndSignUp;

const Container = styled.main`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);

  &:before {
    background: url("/images/signInBgImage.jpg") center center / cover;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
