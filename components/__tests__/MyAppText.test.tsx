import { render } from '@testing-library/react-native';
import MyAppText from '@/components/common/MyAppText';

it(`MyAppText Component renders correctly`, () => {
    const { toJSON } = render(
        <MyAppText>Test</MyAppText>
    );    
    expect(toJSON()).toMatchSnapshot();
});