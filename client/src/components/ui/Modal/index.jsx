import * as SC from "./styles";

export const Modal = ({ children, ...props }) => {
    return (
        <SC.ModalWrapper>
            <SC.Modal {...props}>{children}</SC.Modal>  
        </SC.ModalWrapper>
    ) 
};