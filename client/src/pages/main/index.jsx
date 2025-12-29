import { Button } from "../../components/ui/Button";
import { Container } from "../../components/ui/Container";
import { Field } from "../../components/ui/Field/styles";
import { Text } from "../../components/ui/Text";
import { Typo } from "../../components/ui/Typo";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Field>
                <Typo>Tabata-timer</Typo>    
            </Field>
            <Field>
                <Text>
                    Это приложение для высокоинтенсивных интервальных тренировок (HIIT), 
                    разработанное японским исследователем Изуми Табата. 
                    Обычно программа состоит из раундов с высокой интенсивностью в течение 20 секунд и 
                    последующего отдыха в течение 10 секунд, повторяющихся 8 раз (всего 4 минуты).
                </Text>    
            </Field>
            <Field>
                <Button onClick={() => navigate('/timers')}>Список таймеров</Button>
                <Button onClick={() => navigate('/timers/add')}>Новый таймер</Button>   
            </Field>  
        </Container>
    )
};
