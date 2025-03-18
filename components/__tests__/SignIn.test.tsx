import { render } from '@testing-library/react-native';
import SignIn from '@/components/authComponents/SignIn';

jest.mock('@/lib/supabase', () => ({
    supabase: {

    },
}));

it(`SignIn Component renders correctly`, () => {
    const { toJSON } = render(
        <SignIn
            setMenu={() => {}}
        />
    );    
    expect(toJSON()).toMatchSnapshot();
});