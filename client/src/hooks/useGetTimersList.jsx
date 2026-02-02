import { useCallback } from "react";

export const useGetTimersList = () => {
    return useCallback(() => {
        return fetch('http://localhost:3003/api/timers/list').then((response) => response.json());
    }, []);
};