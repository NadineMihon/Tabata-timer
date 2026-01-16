import { useCallback } from "react"

export const useGetTimer = (id) => {
    return useCallback(async () => {
        if (!id) return Promise.reject(new Error('ID обязателен!'));

         return await fetch(`http://localhost:3003/api/timers/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Не удалось получить таймер`);
                }

                return response.json();
            });
    }, [id]);
};