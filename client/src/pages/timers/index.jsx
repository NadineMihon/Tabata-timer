import { useNavigate } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { Button } from "../../components/ui/Button";
import { Timers } from "../../components/Timers";
import { useState, useCallback, useEffect } from "react";
import { useGetTimersList } from "../../hooks/useGetTimersList";

export const TimersPage = () => {
    const navigate = useNavigate();

    const [timersList, setTimersList] = useState([]);

    const getTimersList = useGetTimersList();

    const updateTimersList = useCallback(async () => {
        try {
            const result = await getTimersList();

            setTimersList(result.timers || []);

        } catch (e) {
            console.log(e);
        }
    }, [getTimersList]);
    
    useEffect(() => {
       updateTimersList();
    }, [updateTimersList]);

    return (
        <Container>
            <Typo>Список таймеров</Typo>
            <Timers timers={timersList} updateTimersList={updateTimersList}/>
            <Button onClick={() => navigate('/timers/add')}>Новый таймер</Button>
        </Container>
    )
};