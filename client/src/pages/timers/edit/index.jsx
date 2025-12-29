import { useNavigate } from "react-router-dom";
import { TimerForm } from "../../components/TimerForm";

export const EditTimerPage = () => {
    const navigate = useNavigate();

    const onSubmitForm = (formValue) => {
        //TODO: add method editTimer

        navigate('/timers');
    };

    return (
        <TimerForm title={'Редактировать таймер'} onSubmitForm={onSubmitForm} />
    )
};