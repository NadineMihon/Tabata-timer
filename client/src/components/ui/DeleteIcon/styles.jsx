import styled from "styled-components";

export const DeleteIcon = styled.div `
    position: absolute;
    top: ${props => props.$top === '10px' ? '10px' : '2px'};
    right: 20px;
    font-size: 30px;
    font-weight: 600;
    color: #4314ffbd;
    cursor: pointer;
`