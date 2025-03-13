import { render } from '@testing-library/react-native';
import Welcome from '@/components/authComponents/Welcome';

it(`Welcome Component renders correctly`, () => {
    const { toJSON } = render(
        <Welcome
            setMenu={() => {}}
        />
    );    
    expect(toJSON()).toMatchSnapshot();
});