import { render } from '@testing-library/react-native';
import PuzzleOfTheDay from '@/app/puzzleOfTheDay';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
});

it(`PuzzleOfTheDay Component renders correctly`, () => {
    const { toJSON } = render(
        <PuzzleOfTheDay/>
    );
    expect(toJSON()).toMatchSnapshot();
});