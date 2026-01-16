import { createBrowserRouter } from "react-router-dom";
import { Root } from "../components/Root";
import { MainPage } from "../pages/main";
import { TimersPage } from "../pages/timers";
import { DetailTimerPage } from "../pages/timers/detail";
import { AddTimerPage } from "../pages/timers/add";

export const routesConfig = [
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: '/timers',
                element: <TimersPage />
            },
            {
                path: '/timers/:timerId',
                element: <DetailTimerPage />
            },
            {
                path: '/timers/add',
                element: <AddTimerPage />
            },
        ]    
    }
];

export const appRouter = createBrowserRouter(routesConfig);