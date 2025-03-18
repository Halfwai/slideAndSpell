import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import Menu from '@/app/menu';

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

it(`Menu Component renders correctly`, () => {
    const { toJSON } = render(
        <NavigationContainer>
            <Menu/>
        </NavigationContainer>
    );
    expect(toJSON()).toMatchSnapshot();
});