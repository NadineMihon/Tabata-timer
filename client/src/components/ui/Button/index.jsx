import * as SC from "./styles";

export const Button = ({ children, bgColor, ...props }) => <SC.Button $bgColor={bgColor} {...props}>{children}</SC.Button>