import { render } from '@testing-library/react-native';
import ScoreComponent from '@/components/submenuComponents/ScoreComponent';

it(`ScoreComponent Component renders correctly`, () => {
    const { toJSON } = render(
        <ScoreComponent
            slides={0}
            incrementTime={false}
            gameOver={false}
            returnTime={() => {}}
            slideUp={false}
        />
    );    
    expect(toJSON()).toMatchSnapshot();
});