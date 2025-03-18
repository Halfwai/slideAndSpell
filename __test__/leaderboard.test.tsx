import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import LeaderBoard from '@/app/leaderboard';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

jest.mock('@/utils/supabaseFunctions', () => ({
    getLeaderboard: jest.fn(() =>
        Promise.resolve([
            {
                slides: 1,
                time_seconds: 1,
                display_name: 'test1',
                solution: [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]],
            },
        ])
    ),
}));

it(`LeaderBoard Component renders correctly`, async() => {
    const { toJSON } = render(
        <LeaderBoard/>
    );
    await waitFor(() => {
        expect(toJSON()).toMatchSnapshot();
    });
});