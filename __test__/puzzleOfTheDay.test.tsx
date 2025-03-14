import React from 'react';
import { render } from '@testing-library/react-native';
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

it(`PuzzleOfTheDay Component renders correctly`, () => {
    const { toJSON } = render(
        <PuzzleOfTheDay/>
    );
    expect(toJSON()).toMatchSnapshot();
});