import { useNavigate } from "react-router-dom";
import { Text } from "../../../ui/Text";

import * as SC from "./styles";

export const Timer = ({ timer }) => {
    const navigate = useNavigate();

    return(
        <SC.Timer onClick={() => navigate(`/timers/${timer._id}`, { state: {timer} })}>
            <SC.Title>{timer.title}</SC.Title>
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
        </SC.Timer>
    )
}