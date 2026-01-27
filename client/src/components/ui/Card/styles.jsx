import styled from "styled-components";

export const Card = styled.div `
    width: 100%;
    position: relative;
    padding: 15px;
    margin: 0 auto;
    border: 2px solid #a38cff6f;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    justify-content: space-between;

    background-color:${props => {
        if (props.$phase === 'Работа') return '#ff4d4d44';
        if (props.$phase === 'Отдых') return '#00c04044';

        return '#ffffff';
    }};

    max-width:${props => {
        if (props.$width === 400) return '400px';

        return '600px';
    }};

`