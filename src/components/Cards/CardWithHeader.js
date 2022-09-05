import { Card, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
// @mui icons

function CardWithHeader({ children, title }) {
    return (
        <Wrapper>
            <MainCard >
                <CardHead>
                    <CardHeadText variant="h5" color="white" >
                        {title}
                    </CardHeadText>
                    {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                                    <Grid item xs={2}>
                                        <Typography href="#" variant="body1" color="white">
                                            <FacebookIcon color="inherit" />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography href="#" variant="body1" color="white">
                                            <GitHubIcon color="inherit" />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography href="#" variant="body1" color="white">
                                            <GoogleIcon color="inherit" />
                                        </Typography>
                                    </Grid>
                                </Grid> */}
                </CardHead>
                {children}
            </MainCard>
        </Wrapper>
    )
}

export default CardWithHeader



const CardHead = styled.div`
    margin: -24px 16px 8px;
    padding: 16px;
    text-align: center;
    opacity: 1;
    color: rgb(52, 71, 103);
    border-radius: 0.5rem;
    background: ${props=>props.theme.gradient.mainLinearGradient};
    box-shadow: ${props=>props.theme.shadow.mainBoxShadow};
    z-index: 2;
    height: 96px;
    position: absolute;
    width: calc(100% - 32px);
    display: flex;
    align-items: center;
    justify-content: center;
`

const MainCard = styled(Card)`
    border-radius:0.5rem !important;
`

const CardHeadText = styled(Typography)`
    font-weight: 700 !important;
`
const Wrapper = styled.div`
    position: relative;
`