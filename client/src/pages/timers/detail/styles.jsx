import styled from "styled-components";

export const Wrapper = styled.div `
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`

export const TimerWrapper = styled.div `
    max-width: 400px;
    width: 100%;
    padding: 15px;
    margin: 0 auto;
    border: 2px solid #a38cff6f;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color:${props => {
        if (props.$phase === 'Работа') return '#ff4d4d44';
        if (props.$phase === 'Отдых') return '#00c04044';
    }};
`

export const Timer = styled.div `
    margin: 0 auto 20px;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
`
export const Time = styled.div `
    font-size: 50px;
    font-weight: 600;
    color: #130061;
`