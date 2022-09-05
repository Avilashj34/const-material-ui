import React, { useState } from "react";

import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { BlueGradientButton } from "../components/Buttons";
import {
  RotatingCard,
  CardWithHeader,
  BackCard,
  FrontCard,
} from "../components/Cards";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "../features/SnackBar/snackbarSlice";

const statusCodeArray = [401, 403, 404, 409, 422]

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailRegex = /^(?=.{1,81}$)[\w.-]+@[\w.-]+\.\w{2,4}$/;

const searchAccountInitialValues = {
  email: "",
};

const searchAccountValidate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid Email";
  }
  return errors;
};

const recoverPasswordValidate = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid Email";
  }
  if (!values.confirmCode) {
    errors.confirmCode = "Required";
  } else if (values.confirmCode.length !== 6) {
    errors.confirmCode = "OTP should be 6 digit long";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "Password must contain atleast one capital and number and must be 8 character long";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Confirm Password doesnt match with Password";
  }
  return errors;
};

function ForgotPassword() {
  const [rotate, setrotate] = useState(false);
  const [email, setemail] = useState(null);

  const dispatch = useDispatch();
  const recoverPasswordInitialValues = {
    email: email,
    confirmCode: "",
    password: "",
    confirmPassword: "",
  };
  let navigate = useNavigate();
  const searchAccountOnSubmit = (values) => {
    axios
      .post("/auth/forgot_password", values)
      .then((_response) => {
        setemail(() => values.email);
        setrotate(() => !rotate);
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
  const recoverPasswordOnSubmit = (values) => {
    axios
      .post("/auth/confirm/forgot_password", {
        email: values.email,
        newPassword: values.password,
        confirmCode: values.confirmCode,
      })
      .then((_response) => {
        navigate("/");
        dispatch(
          showSuccessSnackbar({
            snackbarMessage: "Your password has been changed",
          })
        );
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
              {email == null && !rotate && (
                <FrontCard sx={{ minWidth: 275 }}>
                  <CardWithHeader title={"Recover Password"}>
                    <Formik
                      initialValues={searchAccountInitialValues}
                      validate={searchAccountValidate}
                      onSubmit={searchAccountOnSubmit}
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
                            <Typography>
                              Please enter your email address or mobile number
                              to search for your account.
                            </Typography>
                          </Box>
                          <Box mb={2}>
                            <TextField
                              variant="outlined"
                              type="email"
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
                          <Box
                            sx={{ display: "flex", columnGap: "10px" }}
                            justifyContent={"end"}
                            mt={4}
                            mb={1}
                          >
                            <Button component={Link} to={"/"}>
                              Cancel
                            </Button>
                            <BlueGradientButton
                              variant="contained"
                              type="submit"
                            >
                              search
                            </BlueGradientButton>
                          </Box>
                        </Box>
                      )}
                    </Formik>
                  </CardWithHeader>
                </FrontCard>
              )}
              {email != null && rotate && (
                <BackCard sx={{ minWidth: 275 }}>
                  <CardWithHeader title={"Enter Security Code"}>
                    <Formik
                      initialValues={recoverPasswordInitialValues}
                      validate={recoverPasswordValidate}
                      onSubmit={recoverPasswordOnSubmit}
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
                            <Typography>
                              Please check your emails for a message with your
                              code. Your code is 6 numbers long.
                            </Typography>
                          </Box>
                          <Box mb={2}>
                            <Box mb={2}>
                              <TextField
                                variant="outlined"
                                type="text"
                                label="OTP"
                                fullWidth
                                name="confirmCode"
                                {...props.getFieldProps("confirmCode")}
                                error={
                                  props.touched.confirmCode &&
                                  Boolean(props.errors.confirmCode)
                                }
                                helperText={
                                  props.touched.confirmCode &&
                                  props.errors.confirmCode
                                }
                              />
                            </Box>
                          </Box>
                          <Box mb={2}>
                            <TextField
                              variant="outlined"
                              name="password"
                              type="password"
                              label="New Password"
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
                          <Box mb={2}>
                            <TextField
                              variant="outlined"
                              name="confirmPassword"
                              type="password"
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
                          <Box
                            sx={{ display: "flex", columnGap: "10px" }}
                            justifyContent={"end"}
                            mt={4}
                            mb={1}
                          >
                            <Button component={Link} to={"/"}>
                              Cancel
                            </Button>
                            <BlueGradientButton
                              variant="contained"
                              type="submit"
                            >
                              continue
                            </BlueGradientButton>
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

export default ForgotPassword;

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
