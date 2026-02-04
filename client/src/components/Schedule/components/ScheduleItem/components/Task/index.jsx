import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../../../ui/Container";
import { Text } from "../../../../../ui/Text";
import { Field } from "../../../../../ui/Field";
import { DeleteIcon } from "../../../../../ui/DeleteIcon";
import { Button } from "../../../../../ui/Button";
import { useGetTimer } from "../../../../../../hooks/useGetTimer";
import { useUpdateTaskList } from "../../../../../../hooks/useUpdateTaskList";

export const Task = ({ task, updateTaskList }) => {
    const navigate = useNavigate();

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

    const { deleteTask } = useUpdateTaskList();

    const deleteTaskItem = async () => {
        try {
            const result = await deleteTask(task._id);

            if (!result) return;

            await updateTaskList();
        } catch (e) {
            console.log('Возникла ошибка при удалении', e)
        }
    };

    const disabled = Boolean(task.completedAt);

    //TODO: Add Loader
    if (!timer) return <>Loading...</>

    return (
        <Container>
            <Field $justifyContent = {'left'}>
                <DeleteIcon onClick={() => deleteTaskItem()} />
                <Text>{time}:</Text>
                <Text>{timer.title}</Text>
                <Text>{statusIcon}</Text>
                <Button 
                    onClick={() => navigate(`/timers/${timer._id}`, { state: {timer, taskId: task._id} })}
                    disabled={disabled}
                >
                    Старт
                </Button>   
            </Field>
        </Container>
    )
};