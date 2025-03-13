import { act, render } from '@testing-library/react-native';
import { View } from 'react-native';

import AuthComponentContainer from '@/components/authComponents/AuthComponentContainer';

it('Auth Component Container renders correctly', () => {
    const { toJSON } = render(
        <AuthComponentContainer position={{ x: 0, y: 0 }}>
            <View />
        </AuthComponentContainer>
    );
    expect(toJSON()).toMatchSnapshot();
});