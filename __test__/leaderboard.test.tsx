import { render } from '@testing-library/react-native';

import LeaderBoard from '@/app/leaderboard';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

it(`LeaderBoard Component renders correctly`, () => {
    const { toJSON } = render(
        <LeaderBoard/>
    );
    expect(toJSON()).toMatchSnapshot();
});