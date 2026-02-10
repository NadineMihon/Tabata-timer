import { Container } from "../../../ui/Container";
import { Card } from "../../../ui/Card/styles";
import { Typo } from "../../../ui/Typo";
import { Task } from "./components/Task";

export const ScheduleItem = ({ scheduleItem, updateTaskList }) => {
    const formatDate = () => {
        const raw = scheduleItem.date;
        const date = new Date(raw);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        const currentDate = `${day}.${month}.${year}`;

        return currentDate;
    };

    const date = formatDate();

    return (
        <Container>
            <Card $width={400}>
                <Typo>{date}</Typo>
                {
                    scheduleItem.tasks.map((task) => <Task key={task._id} task={task} updateTaskList={updateTaskList} />)
                }
            </Card>
        </Container>
    )
};