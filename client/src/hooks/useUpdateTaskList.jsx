import { useCallback } from "react";

export const useUpdateTaskList = () =>{
    const BASE_URL = 'http://localhost:3003/api/tasks';

    const asyncAction = useCallback(async (endpoint, options = {}) => {
        try {
            const res = await fetch(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                ...options
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Возникла ошибка');
            }

            return await res.json();

        } catch (e) {
            console.log(e);
        }
    }, []);

    const addTask = useCallback(async (data) => {
        return asyncAction('/add', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }, [asyncAction]);

    const deleteTask = useCallback(async (id) => {
        return asyncAction('/delete', {
            method: 'DELETE',
            body: JSON.stringify({ _id: id }),
        })
    }, [asyncAction]);

    const updateTask = useCallback(async (id, data) => {
        return asyncAction(`/list/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }, [asyncAction]);

    const updateTaskNotification = useCallback(async (id, data) => {
        return asyncAction(`/list/${id}/notification`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }, [asyncAction]);

    return {
        addTask,
        deleteTask, 
        updateTask, 
        updateTaskNotification
    }
};