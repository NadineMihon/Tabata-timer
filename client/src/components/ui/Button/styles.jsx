import styled from "styled-components";

export const Button = styled.button `
    font-family: Raleway;
    font-size: 18px;
    max-width: 200px;
    font-weight: 600;
    border-radius: 20px;
    border: none;
    padding: 8px 20px;
    color: black;
    background-color: ${props => props.$bgColor ? '#b119198d' : '#ae9aff88'};
    cursor: pointer;

    &:hover {
        background-color:${props => props.$bgColor ? '#b30505ca' : '#6c48fc93'};
        font-weight: 600;
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;

        &:hover {
           background-color:#000000ca;
           font-weight: 500; 
        }
    }
`