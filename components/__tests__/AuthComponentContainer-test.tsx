import { render } from '@testing-library/react-native';
import { View } from 'react-native';

import AuthComponentContainer from '@/components/AuthComponentContainer';

it(`Auth Component Container renders correctly`, () => {
    jest.useFakeTimers();
    jest.runAllTimers();
    const { toJSON } = render(
        <AuthComponentContainer position={{x: 0, y: 0}}><View></View></AuthComponentContainer>
    );
    expect(toJSON()).toMatchSnapshot();
});