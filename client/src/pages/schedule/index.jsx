import { Schedule } from "../../components/Schedule";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";

const INITIAL_ITEMS = [
    {
        _id: 1,
        timerId: '697230d4ab4953ad9d3d5532',
        date: '2026-01-24',
        time: '16:00',
        status: 'done'
    },
    {
        _id: 2,
        timerId: '697230d4ab4953ad9d3d5532',
        date: '2026-01-24',
        time: '20:00',
        status: 'scheduled'
    },
    {
        _id: 3,
        timerId: '697230d4ab4953ad9d3d5532',
        date: '2026-01-25',
        time: '16:00',
        status: 'scheduled'
    },
];

export const SchedulePage  = () => {
    return (
        <Container>
            <Typo>Моё расписание тренировок</Typo>
            <Schedule taskList={INITIAL_ITEMS}/>
        </Container>
    )
};