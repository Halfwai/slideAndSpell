import { act, render } from '@testing-library/react-native';
import SignUp from '@/components/authComponents/SignUp';

jest.mock('@/lib/supabase', () => ({
    supabase: {

    },
}));

it(`SignUp Component renders correctly`, async() => {
    const { toJSON } = render(
        <SignUp
            setMenu={() => {}}
        />
    );
    expect(toJSON()).toMatchSnapshot();
});