import { Container } from "../ui/Container";
import { Timer } from "./components/Timer";

import * as SC from "./styles";

export const Timers = ({ timers, updateTimersList }) => {
    return (
        <Container>
            <SC.Timers>
                {
                    timers.map((timer) => <Timer key={timer._id} timer={timer} updateTimersList={updateTimersList} />)
                }
            </SC.Timers>    
        </Container>
    )
};