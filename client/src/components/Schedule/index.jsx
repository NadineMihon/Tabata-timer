import { useEffect, useState } from "react";
import { ScheduleItem } from "./components/ScheduleItem";
import { Container } from "../ui/Container";

import * as SC from "./styles";

export const Schedule = ({ taskList, updateTaskList }) => {
    const [trainingSchedule, setTrainingSchedule] = useState([]);

    useEffect(() => {
        if (taskList.length > 0) {
            let grouped = [];

            for (let task of taskList) {
                const existingDay = grouped.find(day => day.date === task.date);
                
                if (existingDay) {
                    existingDay.tasks.push(task);
                } else {
                    grouped.push({
                        date: task.date,
                        tasks: [task]
                    });
                }
            };

            grouped.forEach(day => {
                day.tasks.sort((a, b) => a.time.localeCompare(b.time)); 
            });

            grouped.sort((a, b) => a.date.localeCompare(b.date));

            setTrainingSchedule(grouped);    
        }
    }, [taskList]);

    return (
        <Container>
            <SC.ScheduleWrapper>
                {
                    trainingSchedule.map((day) => <ScheduleItem 
                        key={day.date} 
                        scheduleItem={day} 
                        updateTaskList={updateTaskList}
                    />)
                }    
            </SC.ScheduleWrapper>
        </Container>
    )
};