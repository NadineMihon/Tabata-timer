import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "../../../components/ui/Container";
import { Typo } from "../../../components/ui/Typo";
import { Text } from "../../../components/ui/Text";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";

import * as SC from "./styles";

export const DetailTimerPage = () => {
    const [isRunning, setIsRunning] = useState(false);
    const location = useLocation();

    const initialTimer = location.state?.timer;

    const timerIcon = isRunning ? '❚❚' : '▶';

    const onClick = () => {
        setIsRunning(!isRunning);
    };

    return (
        <Container>
            <SC.Wrapper>
                <Typo>{initialTimer.title}</Typo>
                <SC.TimerWrapper>
                    <Typo>Стадия</Typo>
                    <SC.Timer>
                        <Text>00.00</Text>
                        <Button onClick={onClick}>{timerIcon}</Button>
                    </SC.Timer>
                    <Text>Текущий цикл</Text>
                </SC.TimerWrapper>
                <Field>
                    <Text>{initialTimer.info}</Text>    
                </Field>    
            </SC.Wrapper>
        </Container>
    )
};