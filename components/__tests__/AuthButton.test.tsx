import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import AuthButton from '@/components/buttons/AuthButton';
import { COLOURS } from '@/constants/colours';

it(`Auth Button renders correctly with inherited style`, () => {
    const { getByTestId, toJSON } = render(
        <AuthButton text="Close" onPress={() => {}} style={{ backgroundColor: COLOURS.green }} />
    );
    const button = getByTestId('authButton');
    expect(toJSON()).toMatchSnapshot();
    expect(button).toHaveStyle({ backgroundColor: COLOURS.green });
});

it(`Auth Button press calls function`, () => {
    const testFunction = jest.fn()
    const { getByText, toJSON } = render(
        <AuthButton text="Close" onPress={() => {testFunction()}} style={{ backgroundColor: COLOURS.green }} />
    );
    const button = getByText('Close');
    fireEvent.press(button);
    expect(testFunction).toHaveBeenCalled();
});