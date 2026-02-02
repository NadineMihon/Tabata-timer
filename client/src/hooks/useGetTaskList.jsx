import { useCallback } from "react"

export const useGetTaskList = () => {
    return useCallback(() => fetch('http://localhost:3003/api/tasks/list').then((response) => response.json()), []);
};