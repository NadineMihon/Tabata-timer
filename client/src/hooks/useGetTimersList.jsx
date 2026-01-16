import { useCallback } from "react"

export const useGetTimersList = () => {
    return useCallback(() => fetch('http://localhost:3003/api/timers/list').then((response) => response.json()), []);
};