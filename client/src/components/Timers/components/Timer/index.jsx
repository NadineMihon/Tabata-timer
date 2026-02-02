import { useNavigate } from "react-router-dom";
import { Text } from "../../../ui/Text";
import { Card } from "../../../ui/Card/styles";
import { DeleteIcon } from "../../../ui/DeleteIcon";
import { useUpdateTimersList } from "../../../../hooks/useUpdateTimersList";

import * as SC from "./styles";

export const Timer = ({ timer, updateTimersList }) => {
    const navigate = useNavigate();

    const { deleteTimer } = useUpdateTimersList();

    const deleteTimerItem = async () => {
        try {
            const result = await deleteTimer(timer.title);

            if (!result) return;

            await updateTimersList();
        } catch (e) {
            console.log('Возникла ошибка при удалении', e);
        } 
    };

    return(
        <Card>
            <DeleteIcon $top={'10px'} onClick={() => deleteTimerItem()} />
            <SC.Title onClick={() => navigate(`/timers/${timer._id}`, { state: {timer} })}>{timer.title}</SC.Title>
            <SC.Description>
                <SC.TimerValues>
                    <Text><span>Количество циклов:</span> {timer.cycles}</Text>
                    <Text><span>Время работы:</span> {timer.workTime} секунд</Text>
                    <Text><span>Время отдыха:</span> {timer.restTime} секунд</Text>
                </SC.TimerValues>
                {
                    timer.info && <SC.Info>
                        <Text><span>Описание упражнения:</span></Text>
                        <Text>{timer.info}</Text>    
                    </SC.Info>
                }
            </SC.Description>
        </Card>
    )
};