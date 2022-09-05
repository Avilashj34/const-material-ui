import { Button, Divider } from "@mui/material";
import styled from "styled-components";

const BlueGradientButton = styled(Button)`
    font-weight: 700 !important;
    border-radius: 0.5rem;
    background: ${props => props.theme.gradient.mainLinearGradient};
    box-shadow: ${props => props.theme.shadow.mainBoxShadow};
`



export {BlueGradientButton}