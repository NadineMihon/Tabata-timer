import { useState, useEffect, useCallback } from "react";
import { Container } from "../../../../../ui/Container";
import { Text } from "../../../../../ui/Text";
import { Field } from "../../../../../ui/Field";
import { DeleteIcon } from "../../../../../ui/DeleteIcon";
import { useGetTimer } from "../../../../../../hooks/useGetTimer";
import { useUpdateTaskList } from "../../../../../../hooks/useUpdateTaskList";

export const Task = ({ task, updateTaskList }) => {
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

    //TODO: Add Loader
    if (!timer) return <>Loading...</>

    return (
        <Container>
            <Field $justifyContent = {'left'}>
                <DeleteIcon onClick={() => deleteTaskItem()} />
                <Text>{time}:</Text>
                <Text>{timer.title}</Text>
                <Text>{statusIcon}</Text>   
            </Field>
        </Container>
    )
};