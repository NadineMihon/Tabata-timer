import { useState, useEffect, useCallback } from "react";
import { Container } from "../../../../../ui/Container";
import { Text } from "../../../../../ui/Text";
import { Field } from "../../../../../ui/Field";
import { useGetTimer } from "../../../../../../hooks/useGetTimer";

export const Task = ({ task }) => {
    const [timer, setTimer] = useState(null);

    const { timerId, time, status } = task;

    const getTimer = useGetTimer(timerId);
    
    const updateTimer = useCallback(async () => {
        try {
            const result = await getTimer();
    
            setTimer(result);
        } catch (e) {
            console.log(e);
        }
    }, [getTimer]);
            
    useEffect(() => {
        updateTimer();
    }, [updateTimer]);

    const statusIcon = status === "scheduled" ? "⌛" : status === "done" ? "✔️" : "❌";

    //TODO: Add Loader
    if (!timer) return <>Loading...</>

    return (
        <Container>
            <Field>
                <Text>{time}:</Text>
                <Text>{timer.title}</Text>
                <Text>{statusIcon}</Text>    
            </Field>
        </Container>
    )
};