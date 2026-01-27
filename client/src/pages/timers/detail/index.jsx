import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetTimer } from "../../../hooks/useGetTimer";
import { Container } from "../../../components/ui/Container";
import { Card } from "../../../components/ui/Card/styles";
import { Form } from "../../../components/ui/Form";
import { Modal } from "../../../components/ui/Modal";
import { Typo } from "../../../components/ui/Typo";
import { Text } from "../../../components/ui/Text";
import { Field } from "../../../components/ui/Field";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useTabataTimer } from "../../../hooks/useTabataTimer";
import { useUpdateTimersList } from "../../../hooks/useUpdateTimersList";

import * as SC from "./styles";

export const DetailTimerPage = () => {
    const [timerData, setTimerData] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const navigate = useNavigate();

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

    const onSubmit = (e) => {
        //TODO: add method addToSchedule
        e.preventDefault();
        console.log(selectedDate, "selectedDate");
        console.log(selectedTime, "selectedTime");
        setScheduleModalOpen(false)
    };

    const { deleteTimer } = useUpdateTimersList();
    
    const deleteTimerItem = () => {
        deleteTimer(timer.title);
        setDeleteModalOpen(false);
        navigate('/timers'); 
    };

    if (!timer) return <>Loading..</>

    return (
        <Container>
            {
                deleteModalOpen &&
                    <Modal>
                        <Text>Вы уверены, что хотите удалить этот таймер?</Text>
                        <Field>
                            <Button bgColor="red" onClick={deleteTimerItem}>Да</Button>
                            <Button onClick={() => setDeleteModalOpen(false)}>Нет</Button>
                        </Field>
                    </Modal>
            }
            {
                scheduleModalOpen &&
                    <Modal>
                        <Text>Выберите дату и время</Text>
                        <Form onSubmit={onSubmit}>
                            <Field>
                                <Input 
                                    type="date"
                                    name="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setSelectedDate(e.target.value)} 
                                    required
                                />
                            </Field>
                            <Field>
                                <Input 
                                    type="time" 
                                    name="time"
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">Сохранить</Button>
                                <Button bgColor="red" onClick={() => setScheduleModalOpen(false)}>Отмена</Button>
                            </Field>    
                        </Form>
                    </Modal>
            }
            <SC.Wrapper>
                <Typo>{timer.title}</Typo>
                <Card $phase={currentPhase} $width={400}>
                    <Typo>{currentPhase}</Typo>
                    <SC.Timer>
                        <SC.Time>{timeLeft}</SC.Time>
                        <Button onClick={handleIsRunning} disabled={disabled}>{timerIcon}</Button>
                        <Button onClick={resetTimer}>↺</Button>
                    </SC.Timer>
                    <Text>Текущий цикл: {currentCycle} из {timer.cycles}</Text>
                </Card>
                <Field>
                    <Text>{timer.info}</Text>    
                </Field>
                <Field>
                    <Button onClick={() => setScheduleModalOpen(true)}>Запланировать</Button>
                    <Button bgColor="red" onClick={() => setDeleteModalOpen(true)}>Удалить</Button>
                </Field>    
            </SC.Wrapper>
        </Container>
    )
};