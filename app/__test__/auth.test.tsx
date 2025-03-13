import { render } from '@testing-library/react-native';

import Auth from '@/app/auth';

afterEach(() => {
    jest.clearAllMocks();  // Clears all Jest mocks
    jest.useRealTimers();  // Resets timers
});

it(`Auth Component renders correctly`, () => {
    const { toJSON } = render(
        <Auth/>
    );
    expect(toJSON()).toMatchSnapshot();
});