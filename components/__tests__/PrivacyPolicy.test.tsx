import { render } from '@testing-library/react-native';
import PrivacyPolicy from '@/components/modals/PrivacyPolicy';

it(`PrivacyPolicy Component renders correctly`, () => {
    const { toJSON } = render(
        <PrivacyPolicy
            hidePrivacyPolicy={() => {}}
        />
    );    
    expect(toJSON()).toMatchSnapshot();
});