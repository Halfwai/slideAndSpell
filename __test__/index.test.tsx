import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

import Index from '@/app/index';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

it(`Index Component renders correctly`, () => {
    const { toJSON } = render(
        <Index/>
    );
    waitFor(() => {
        expect(toJSON()).toMatchSnapshot();
    })
});