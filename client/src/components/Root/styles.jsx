import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div `
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-family: Raleway;
    font-size: 18px;
`
export const Menu = styled.div `
    margin: 30px auto;
    padding: 10px 30px;
    max-width: 400px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    border: 2px solid #08068514;
    border-radius: 30px;
    background-color:#a38cff29;
`
export const MenuItem = styled(NavLink) `
    font-family: Raleway;
    font-size: 20px;
    font-weight: 500;
    color: #000000a2;
    text-decoration: none;
    cursor: pointer;

    &:hover,
    &.active {
        color: #c70101ac;
    }
`