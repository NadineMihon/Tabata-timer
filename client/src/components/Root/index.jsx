import { useState, useCallback, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";
import { Field } from "../ui/Field";
import { useUpdateTaskList } from "../../hooks/useUpdateTaskList";
import { useGetTaskList } from "../../hooks/useGetTaskList";
import { useGetTimer } from "../../hooks/useGetTimer";

import * as SC from "./styles";
import { Footer } from "../ui/Footer";

export const Root = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [timer, setTimer] = useState(null);

    const navigate = useNavigate();

    const { updateTaskNotification } = useUpdateTaskList();

    const showModal = (task) => {
        setIsModalOpen(true);
        setCurrentTask(task);
    };

    const closeModal = (agree) => {
        const showNotification = false;
        updateTaskNotification(currentTask._id, { showNotification });        
        setIsModalOpen(false);

        if (agree) {
            navigate(`/timers/${timer._id}`, { state: { timer, taskId: currentTask._id } });
        }

        setCurrentTask(null);
    };

    const getTaskList = useGetTaskList();
    const getTimer = useGetTimer();

    const updateNotificationTaskList = useCallback(async () => {
        try {
            const response = await getTaskList();

            const notificationTaskList = response.tasks.filter((task) => {
                return (task.status === 'scheduled' && task.showNotification === true);
            })

            if (notificationTaskList.length) {
                showModal(notificationTaskList[0]);

                const result = await getTimer(notificationTaskList[0].timerId);
        
                setTimer(result);
            }

        } catch (e) {
            console.log(e);
        }
    }, [getTaskList]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateNotificationTaskList();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [updateNotificationTaskList]);

    return (
        <SC.Wrapper>
            {
                isModalOpen && <Modal>
                    <Text>У Вас запланирована тренировка - {currentTask.title}</Text>
                    <Text>Хотите начать?</Text>
                    <Field>
                        <Button onClick={() => closeModal(true)}>Да</Button>
                        <Button onClick={() => closeModal(false)}>Позже</Button>    
                    </Field>
                </Modal>
            }
            <Container>
                <SC.Menu>        
                    <SC.MenuItem to={'/'}>Главная страница</SC.MenuItem>
                    <SC.MenuItem to={'/timers'}>Список таймеров</SC.MenuItem>
                    <SC.MenuItem to={'/schedule'}>Расписание</SC.MenuItem>
                </SC.Menu>                        
            </Container>
            <Outlet />
            <Footer />
        </SC.Wrapper>
    )
};