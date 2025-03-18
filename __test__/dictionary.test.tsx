import React from 'react';
import { render } from '@testing-library/react-native';

import Dictionary from '@/app/dictionary';

afterEach(() => {
    jest.clearAllMocks();  // Clears all Jest mocks
    jest.useRealTimers();  // Resets timers
});

it(`Dictionary Component renders correctly`, () => {
    const { toJSON } = render(
        <Dictionary/>
    );
    expect(toJSON()).toMatchSnapshot();
});