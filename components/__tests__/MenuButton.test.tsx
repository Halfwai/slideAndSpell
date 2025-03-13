import { fireEvent, render, act } from '@testing-library/react-native';
import MenuButton from '@/components/buttons/MenuButton';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});


it(`MenuButton Component renders correctly`, async() => {
    const { toJSON } = render(
        <MenuButton 
            text="Test"
            onPress={() => {}}
            delay={1}
            exitMenu={false}
        />
    );
    expect(toJSON()).toMatchSnapshot();
});

it('MenuButton press fires correctly', async() => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
        <MenuButton
            text="Test Button"
            onPress={mockOnPress}
            delay={100}
            exitMenu={false}
        />
    );
    const button = getByTestId('menuButton');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
});