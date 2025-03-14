import React from 'react';
import { render } from '@testing-library/react-native';
import Settings from '@/app/settings';

it(`Settings Component renders correctly`, () => {
    const { toJSON } = render(
        <Settings/>
    );
    expect(toJSON()).toMatchSnapshot();
});