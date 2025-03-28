import React from 'react';
import { render } from '@testing-library/react-native';

import Auth from '@/app/auth';

afterEach(() => {
    jest.clearAllMocks();  // Clears all Jest mocks
    jest.useRealTimers();  // Resets timers
});

jest.mock('@/lib/supabase', () => ({
    supabase: {
        auth: {
            signOut: jest.fn(),
        },
    },
}));

it(`Auth Component renders correctly`, () => {
    const { toJSON } = render(
        <Auth/>
    );
    expect(toJSON()).toMatchSnapshot();
});