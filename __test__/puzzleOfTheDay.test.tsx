import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PuzzleOfTheDay from '@/app/puzzleOfTheDay';

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

it(`PuzzleOfTheDay Component renders correctly`, async() => {
    const { toJSON } = render(
        <PuzzleOfTheDay/>
    );
    await waitFor(() => {
        expect(toJSON()).toMatchSnapshot();
    });
});