import { Container } from "../../../ui/Container";
import { Card } from "../../../ui/Card/styles";
import { Typo } from "../../../ui/Typo";
import { Task } from "./components/Task";

export const ScheduleItem = ({ scheduleItem }) => {
    const formatDate = () => {
        const [year, month, day] = scheduleItem.date.split('-');

        const currentDate = `${day}.${month}.${year}`;

        return currentDate;
    };

    const date = formatDate();

    return (
        <Container>
            <Card>
                <Typo>{date}</Typo>
                {
                    scheduleItem.tasks.map((task) => <Task key={task._id} task={task} />)
                }
            </Card>
        </Container>
    )
};