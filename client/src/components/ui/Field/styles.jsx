import styled from "styled-components";

export const Field = styled.div `
    position: relative;
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: ${props => props.$justifyContent === 'left' ? 'left' : 'center'};
`