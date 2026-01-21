import { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetTimer } from "../../../hooks/useGetTimer";
import { Container } from "../../../components/ui/Container";
import { Typo } from "../../../components/ui/Typo";
import { Text } from "../../../components/ui/Text";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";

import * as SC from "./styles";
import { useTabataTimer } from "../../../hooks/useTabataTimer";

export const DetailTimerPage = () => {
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

    const timer = timerData || initialTimer;

    const { handleIsRunning, resetTimer, timeLeft, isRunning, currentPhase, currentCycle } = useTabataTimer(timer);

    const timerIcon = isRunning ? '❚❚' : '▶';

    const disabled = currentPhase === 'Тренировка завершена';

    if (!timer) return <>Loading..</>

    return (
        <Container>
            <SC.Wrapper>
                <Typo>{timer.title}</Typo>
                <SC.TimerWrapper $phase={currentPhase}>
                    <Typo>{currentPhase}</Typo>
                    <SC.Timer>
                        <SC.Time>{timeLeft}</SC.Time>
                        <Button onClick={handleIsRunning} disabled={disabled}>{timerIcon}</Button>
                        <Button onClick={resetTimer}>↺</Button>
                    </SC.Timer>
                    <Text>Текущий цикл: {currentCycle} из {timer.cycles}</Text>
                </SC.TimerWrapper>
                <Field>
                    <Text>{timer.info}</Text>    
                </Field>    
            </SC.Wrapper>
        </Container>
    )
};