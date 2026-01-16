import styled from "styled-components";

export const Timer = styled.div `
    position: relative;
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #a38cff6f;
    border-radius: 30px;
    padding: 20px;
`
export const DeleteIcon = styled.div `
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    font-weight: 600;
    color: #4314ffbd;
    cursor: pointer;
`
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
    display: flex;
    flex-direction: column;
    gap: 10px;
`