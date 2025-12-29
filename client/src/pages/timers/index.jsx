import { useNavigate } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { Button } from "../../components/ui/Button";
import { Timers } from "../../components/Timers";

const TEST_TIMERS = [
    {
        _id: 1,
        title: 'Упражнение 1',
        cycles: 6,
        workTime: 40,
        restTime: 20,
        info: 'Описание упражнения 1'
    },
    {
        _id: 2,
        title: 'Упражнение 2',
        cycles: 6,
        workTime: 40,
        restTime: 20,
        info: 'Описание упражнения 2'
    },
    {
        _id: 3,
        title: 'Упражнение 3',
        cycles: 6,
        workTime: 40,
        restTime: 20,
        info: 'Описание упражнения 3'
    },
];

export const TimersPage = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typo>Список таймеров</Typo>
            <Timers timers={TEST_TIMERS} />
            <Button onClick={() => navigate('/timers/add')}>Новый таймер</Button>
            <br />
            <br />
            <br />
        </Container>
    )
};