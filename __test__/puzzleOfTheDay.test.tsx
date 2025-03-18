import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PuzzleOfTheDay from '@/app/puzzleOfTheDay';
import { ReactTestRendererJSON } from 'react-test-renderer';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
}));

jest.mock('@/utils/supabaseFunctions', () => ({
    getGameboard: jest.fn(() => {
        return {
            date: "2022-01-01",
            gameBoard: [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]],
            extraLetter: "j",
            hints: [["hint1", "hint2"], ["hint3", "hint4"], ["hint5", "hint6"]]
        }
    }),
    updateUserSolution: jest.fn()
}));

it(`PuzzleOfTheDay Component renders correctly`, async() => {
    let json: ReactTestRendererJSON | ReactTestRendererJSON[] | null
    await waitFor(() => {
        const { toJSON } = render(
            <PuzzleOfTheDay/>
        );
        json = toJSON();
    } );
    jest.advanceTimersByTime(1000)
    await waitFor(() => {
        expect(json).toMatchSnapshot();
    });
});