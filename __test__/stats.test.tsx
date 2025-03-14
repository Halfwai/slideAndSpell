import React from 'react';
import { render } from '@testing-library/react-native';
import Stats from '@/app/stats';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
}));

it(`Stats Component renders correctly`, () => {
    const { toJSON } = render(
        <Stats/>
    );
    expect(toJSON()).toMatchSnapshot();
});