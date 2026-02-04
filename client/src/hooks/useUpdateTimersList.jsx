import { useCallback } from "react"

export const useUpdateTimersList = () => {
    const BASE_URL = 'http://localhost:3003/api/timers';

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

    const addTimer = useCallback(async (data) => {
        return asyncAction('/add', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }, [asyncAction]);

    const deleteTimer = useCallback(async (title, timerId) => {
        return asyncAction('/delete', {
            method: 'DELETE',
            body: JSON.stringify({ title, timerId }),
        })
    }, [asyncAction]);

    return {
        addTimer,
        deleteTimer
    }
};