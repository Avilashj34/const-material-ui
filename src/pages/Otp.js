import React from 'react'

import styled from 'styled-components'
import { Formik } from 'formik';
import { Box, Grid, TextField, Typography } from '@mui/material'

import { BlueGradientButton } from '../components/Buttons';
import { CardWithHeader } from '../components/Cards'
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const otpValidate = values => {
    let errors = {};
    if (!values.confirmCode) {
        errors.confirmCode = 'Required'
    }
    return errors
};


function Otp() {
    const { state } = useLocation();
    const { username } = state;
    const otpInitialValues = {

        username: username,
        confirmCode: ''
    }
    let navigate = useNavigate();
    const otpOnSubmit = values => {
        axios.post('/auth/confirm', values)
            .then((response) => {
                alert("Please Check Your Email for Verification")
                navigate('/');
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                    alert(error.response.data.detail)
                }
                else if (error.response.status === 404) {
                    alert(error.response.data.detail)
                }
                else if (error.response.data.detail === 422) {
                    alert(error.response.data.detail)
                }
                else {
                    alert("Something went wrong")
                }
            })
    };
    console.log(state)
    return (
        <Container>
            <Box px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
                <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                    <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                        <CardWithHeader title={'Enter Security Code'}>
                            <Formik initialValues={otpInitialValues} validate={otpValidate} onSubmit={otpOnSubmit} >
                                {props => (
                                    <Box pt={4} pb={3} px={3} mt={10} onSubmit={props.handleSubmit} component="form" role="form">
                                        <Box mb={2}>
                                            <Typography>Please check your emails for a message with your code. Your code is 6 numbers long.</Typography>
                                        </Box>
                                        <Box mb={2}>
                                            <TextField
                                                variant="outlined"
                                                type="text"
                                                label="OTP"
                                                fullWidth
                                                name='confirmCode'
                                                {...props.getFieldProps('confirmCode')}
                                                error={props.touched.confirmCode && Boolean(props.errors.confirmCode)}
                                                helperText={props.touched.confirmCode && props.errors.confirmCode} />
                                        </Box>
                                        <Box sx={{ display: 'flex', columnGap: '10px' }} justifyContent={"end"} mt={4} mb={1}>
                                            <BlueGradientButton variant="contained" type="submit">
                                                continue
                                            </BlueGradientButton>
                                        </Box>
                                    </Box>)}
                            </Formik>
                        </CardWithHeader>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Otp

const Container = styled.main`
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: rgba(0,0,0,.7);

    &:before{
        background: url('/images/signInBgImage.jpg') center center / cover;
        content:"";
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
`