import { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetTimer } from "../../../hooks/useGetTimer";
import { Container } from "../../../components/ui/Container";
import { Typo } from "../../../components/ui/Typo";
import { Text } from "../../../components/ui/Text";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";

import * as SC from "./styles";

export const DetailTimerPage = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [timerData, setTimerData] = useState(null);

    const location = useLocation();
    const { timerId } = useParams();

    const initialTimer = location.state?.timer;

    const getTimer = useGetTimer(timerId);

    const updateTimer = useCallback(async () => {
        try {
            const result = await getTimer();

            setTimerData(result);
        } catch (e) {
            console.log(e);
        }
    }, [getTimer]);
        
    useEffect(() => {
        updateTimer();
    }, [updateTimer]);

    const timerIcon = isRunning ? '❚❚' : '▶';

    const timer = timerData || initialTimer;

    const onClick = () => {
        setIsRunning(!isRunning);
    };

    if (!timer) return <>Loading..</>

    return (
        <Container>
            <SC.Wrapper>
                <Typo>{timer.title}</Typo>
                <SC.TimerWrapper>
                    <Typo>Стадия</Typo>
                    <SC.Timer>
                        <Text>00.00</Text>
                        <Button onClick={onClick}>{timerIcon}</Button>
                    </SC.Timer>
                    <Text>Текущий цикл</Text>
                </SC.TimerWrapper>
                <Field>
                    <Text>{timer.info}</Text>    
                </Field>    
            </SC.Wrapper>
        </Container>
    )
};