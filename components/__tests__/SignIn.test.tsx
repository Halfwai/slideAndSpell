import { render } from '@testing-library/react-native';
import SignIn from '@/components/authComponents/SignIn';

it(`SignIn Component renders correctly`, () => {
    const { toJSON } = render(
        <SignIn
            setMenu={() => {}}
        />
    );    
    expect(toJSON()).toMatchSnapshot();
});