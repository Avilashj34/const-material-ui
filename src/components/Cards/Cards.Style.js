import styled from "styled-components"

const BackCard = styled.div`
    width:100%;
    height:100%;
    z-index:5;
    transform: rotateY(180deg);
    position:"absolute";
`
const FrontCard = styled.div`
    width:100%;
    height:100%;
    z-index:5;
    position: relative;
`

export {BackCard,FrontCard}