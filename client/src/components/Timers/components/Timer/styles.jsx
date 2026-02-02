import styled from "styled-components";

export const Title = styled.div `
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: #8263ff;
    }
`
export const Description = styled.div `
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`
export const TimerValues = styled.div `
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`
export const Info = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`