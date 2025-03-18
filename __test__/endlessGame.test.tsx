import React from 'react';
import { render } from '@testing-library/react-native';

import EndlessGame from '@/app/endlessGame';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

jest.mock('@/lib/supabase', () => ({
    supabase: {
        auth: {
            signOut: jest.fn(),
        },
    },
}));

it(`EndlessGame Component renders correctly`, () => {
    const { toJSON } = render(
        <EndlessGame/>
    );
    expect(toJSON()).toMatchSnapshot();
});