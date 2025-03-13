import { render, fireEvent } from '@testing-library/react-native';

import RoundButton from '@/components/buttons/RoundButton';

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

it(`RoundButton Component renders correctly`, () => {
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

it(`RoundButton press calls function`, () => {
    const testFunction = jest.fn()
    const { getByTestId } = render(
        <RoundButton 
        icon={"lightbulb-on-outline"}
        onPress={testFunction}
        iconType={"material"}
        colour={"#000"}
    />
    );
    const button = getByTestId('roundButton');
    fireEvent.press(button);
    expect(testFunction).toHaveBeenCalled();
});