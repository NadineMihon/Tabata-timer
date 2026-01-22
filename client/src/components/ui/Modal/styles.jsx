import styled from "styled-components";

export const ModalWrapper = styled.div `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0000006c;
    z-index: 1;
`
export const Modal = styled.div `
    max-width: 400px;
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    border: 1px solid #00000065;
    border-radius: 20px;
    padding: 15px 25px 40px;
    background: #fff8eb;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.5;
`