import { Outlet } from "react-router-dom";
import { Container } from "../ui/Container";
import * as SC from "./styles";

export const Root = () => {
    return (
        <SC.Wrapper>
            <Container>
                <SC.Menu>        
                    <SC.MenuItem to={'/'}>Главная страница</SC.MenuItem>
                    <SC.MenuItem to={'/timers'}>Список таймеров</SC.MenuItem>
                    <SC.MenuItem to={'/schedule'}>Расписание</SC.MenuItem>
                </SC.Menu>                        
            </Container>
            <Outlet />
        </SC.Wrapper>
    )
};