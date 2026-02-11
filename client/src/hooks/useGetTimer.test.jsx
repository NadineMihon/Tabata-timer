import { beforeEach, describe, expect, test } from "vitest";
import { renderHook, act } from '@testing-library/react';
import { useGetTimer } from "./useGetTimer";

beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
});

describe('Checking the operation of useGetTimer', () => {
    test('Successful receipt of the timer name', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ title: 'test' }),
        });

        const { result } = renderHook(() => useGetTimer());
        const getTimer = result.current;

        let timer;
        await act(async () => {
            timer = await getTimer('698a07cea2be53494ddd2863');
        });

        expect(fetch).toHaveBeenCalledWith('http://localhost:3003/api/timers/698a07cea2be53494ddd2863');

        const testTimerTitle = timer.title;

        expect(testTimerTitle).toBe('test');
    });
});