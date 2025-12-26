import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main";
import { TimersPage } from "../pages/timers";
import { DetailTimerPage } from "../pages/timers/detail";
import { AddTimerPage } from "../pages/timers/add";
import { EditTimerPage } from "../pages/timers/edit";

export const routesConfig = [
    {
        path: '/',
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
    {
        path: '/timers/:timerId/edit',
        element: <EditTimerPage />
    }
];

export const appRouter = createBrowserRouter(routesConfig);