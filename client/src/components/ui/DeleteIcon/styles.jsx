import styled from "styled-components";

export const DeleteIcon = styled.div `
    position:${props => props.$position === 'absolute' ? 'absolute' : 'block'};
    top: 10px;
    right: 20px;
    font-size: 30px;
    font-weight: 600;
    color: #4314ffbd;
    cursor: pointer;
`