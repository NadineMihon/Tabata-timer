import { useState, useCallback, useEffect } from "react";
import { Schedule } from "../../components/Schedule";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { Text } from "../../components/ui/Text";
import { useGetTaskList } from "../../hooks/useGetTaskList";
import { Field } from "../../components/ui/Field";
import { Loader } from "../../components/ui/Loader";

export const SchedulePage  = () => {
    const [taskList, setTaskList] = useState(null);

    const getTaskList = useGetTaskList();

    const updateTaskList = useCallback(async () => {
        try {
            const result = await getTaskList();

            setTaskList(result.tasks || []);

        } catch (e) {
            console.log(e);
        }
    }, [getTaskList]);

    useEffect(() => {
        updateTaskList();
    }, [updateTaskList]);

    if (!taskList) return <Loader />

    return (
        <Container>
            <Typo>Моё расписание тренировок</Typo>
            {
                taskList.length ? <Schedule 
                    taskList={taskList} 
                    updateTaskList={updateTaskList}
                /> : <Field>
                    <Text>Тренировки не запланированы</Text>    
                </Field>
            }
        </Container>
    )
};