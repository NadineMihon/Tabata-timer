import { beforeEach, describe, expect, test } from "vitest";
import { renderHook, act, render, fireEvent, screen } from '@testing-library/react';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

import { Timer } from ".";

beforeEach(() => {
    mockNavigate.mockClear();
});

describe('Check how the navigation works from the timer title', () => {
    test('Successful transition to the detailed timer page', () => {
        const timer = {
            _id: 'timer-1',
            title: 'timer-123',
        };

        render(<Timer timer={timer}/>);

        const timerTitle = timer.title;
        const titleElement = screen.getByText(timerTitle);
        fireEvent.click(titleElement);

        expect(mockNavigate).toBeCalledWith(`/timers/${timer._id}`, { state: {timer} });
    });
});