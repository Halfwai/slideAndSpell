import { render } from '@testing-library/react-native';

import RoundButton from '@/components/RoundButton';

it(`RoundButton Component renders correctly`, () => {
    // jest.mock('MaterialCommunityIcons', () => 'MaterialCommunityIconsMock')
    const { toJSON } = render(
        <RoundButton 
            icon={"lightbulb-on-outline"}
            onPress={() => {}}
            iconType={"material"}
            colour={"#000"}
        />
    );
    expect(toJSON()).toMatchSnapshot();
});