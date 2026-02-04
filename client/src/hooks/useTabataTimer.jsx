import { useCallback, useEffect, useState } from "react"
import { useUpdateTaskList } from "./useUpdateTaskList";

export const useTabataTimer = (timer, taskId) => {
    const { cycles, workTime, restTime } = timer;

    const [timeLeft, setTimeLeft] = useState(workTime);
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState('Работа');
    const [currentCycle, setCurrentCycle] = useState(1);

    const playSound = useCallback((soundType) => {
            try {
                const soundMap = {
                    work_start: '/sounds/work_start.mp3',
                    rest_start: '/sounds/rest_start.mp3',
                    complete: '/sounds/complete.mp3'
                };

                if (soundMap[soundType]) {
                    const audio = new Audio(soundMap[soundType]);
                    audio.volume = 0.3;
                    audio.play();
                }
            } catch (e) {
                console.log(e)
            }
    }, []);

    const handleIsRunning = useCallback(() => {
        const willStart = !isRunning;
        setIsRunning(willStart);

        if (willStart) {
            if (currentCycle === 1 && currentPhase === 'Работа' && timeLeft === workTime) {
                playSound('work_start');
            } else if (currentPhase === 'Отдых' && timeLeft === restTime) {
                playSound('rest_start');
            }
        }
    }, [isRunning, currentCycle, currentPhase, timeLeft, workTime, restTime, playSound]);

    const resetTimer = () => {
        setTimeLeft(workTime);
        setIsRunning(false);
        setCurrentPhase('Работа');
        setCurrentCycle(1);
    };

    useEffect(() => {
        let intervalId = null;

        if (isRunning && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };

    }, [isRunning, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            if (currentPhase === 'Работа') {
                playSound('rest_start');
                setCurrentPhase('Отдых');
                setTimeLeft(restTime);
            } else {
                if (currentCycle !== cycles) {
                    playSound('work_start');   
                }
                setCurrentPhase('Работа');
                setCurrentCycle(prev => prev + 1);
                setTimeLeft(workTime);
            }
        }
    }, [timeLeft, isRunning, currentPhase, workTime, restTime, playSound]);

    const { updateTask } = useUpdateTaskList();

    useEffect(() => {
        if (currentCycle > cycles && isRunning) {
            setIsRunning(false);
            setTimeLeft(0);
            playSound('complete');
            setCurrentPhase('Тренировка завершена');
            setCurrentCycle(cycles);

            if (taskId) {
                const completedAt = new Date();
                updateTask(taskId, { completedAt });  
            }
        }
    }, [currentCycle, cycles, isRunning, playSound]);

    return {
        handleIsRunning,
        resetTimer,
        timeLeft,
        isRunning,
        currentPhase,
        currentCycle
    }
};