import animationData  from "./loader-animation.json";
import { Container } from "../Container";

import * as SC from "./styles";

export const Loader = () => {
    return (
        <Container>
            <SC.Loader 
                animationData={animationData}
                loop={true}
                autoplay={true}
            />
        </Container>
    )
};