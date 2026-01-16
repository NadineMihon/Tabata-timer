import { useNavigate } from "react-router-dom";
import { TimerForm } from "../../components/TimerForm";
import { useUpdateTimersList } from "../../../hooks/useUpdateTimersList";

export const AddTimerPage = () => {
    const navigate = useNavigate();

    const { addTimer } = useUpdateTimersList();

    const onSubmitForm = (formValues) => {
        addTimer(formValues);
        navigate('/timers');
    };

    return (
       <TimerForm title={'Создать новый таймер'} onSubmitForm={onSubmitForm} />
    )
};