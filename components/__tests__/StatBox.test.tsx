import { render } from '@testing-library/react-native';
import StatBox from '@/components/submenuComponents/StatBox';

it(`StatBox Component renders correctly`, () => {
    const { toJSON } = render(
        <StatBox
            stat='Test Stat'
            value={100}
            position='left'
        />
    );    
    expect(toJSON()).toMatchSnapshot();
});