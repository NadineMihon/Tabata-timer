import { useState } from "react";
import { Container } from "../../../components/ui/Container";
import { Typo } from "../../../components/ui/Typo";
import { Form } from "../../../components/ui/Form";
import { Field } from "../../../components/ui/Field";
import { Input } from "../../../components/ui/Input";
import { TextAria } from "../../../components/ui/TextAria";
import { Button } from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const DEFAULT_VALUES = { title: '', cycles: '', workTime: '', restTime: '', info: '' };

export const TimerForm = ({ title, onSubmitForm, defaultValues }) => {
    const [formValues, setFormValues] = useState(defaultValues || DEFAULT_VALUES);

    const navigate = useNavigate();

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitForm(formValues);
        setFormValues(DEFAULT_VALUES);
    };

    const disabled = !formValues.title || !formValues.cycles || !formValues.workTime || !formValues.restTime;

    return (
        <Container>
            <Typo>{title}</Typo>
            <Form onSubmit={onSubmit}>
                <Field>
                    <Input
                        name="title"
                        type="text"
                        value={formValues.title}
                        placeholder="Название упражнения"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <Input
                        name="cycles"
                        type="number"
                        value={formValues.cycles}
                        placeholder="Количество циклов"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <Input
                        name="workTime"
                        type="number"
                        value={formValues.workTime}
                        placeholder="Время работы"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <Input
                        name="restTime"
                        type="number"
                        value={formValues.restTime}
                        placeholder="Время отдыха"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <TextAria 
                        name="info"
                        value={formValues.info}
                        placeholder="По желанию, укажите описание упражнения"
                        rows={10} 
                        cols={30}
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <Button type="submit" disabled={disabled}>Сохранить</Button>  
                    <Button bgColor="red" onClick={() => navigate('/timers')}>Отмена</Button>  
                </Field>
            </Form>
        </Container>
    )
};