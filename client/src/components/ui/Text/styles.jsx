import styled from "styled-components";

export const Text = styled.p `
    color: #000000eb;
    text-align: justify;
    text-indent: 20px;
    line-height: 1.5em;
    margin: 0;
    flex:${props => props.$flex === 1 ? 1 : 'none'};

        & span {
            font-weight: 600;
        }
`