import { useNavigate } from "react-router-dom";
import { TimerForm } from "../../components/TimerForm";

export const AddTimerPage = () => {
    const navigate = useNavigate();

    const onSubmitForm = (formValues) => {
        //TODO: add method addTimer
        navigate('/timers');
    };

    return (
       <TimerForm title={'Создать новый таймер'} onSubmitForm={onSubmitForm} />
    )
};