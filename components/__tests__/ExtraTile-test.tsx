import { render } from '@testing-library/react-native';

import ExtraTile from '@/components/ExtraTile';

it(`ExtraTile Component renders correctly`, () => {
    const { toJSON } = render(
        <ExtraTile 
            letter={"A"}
            tileSize={50}
            spaceSize={50}
            boardSize={5}
            zeroPos={{ x: 0, y: 0 }}
            canInsert={true}
            setEmptySquareColour={() => {}}
            removeZero={() => {}}            
        />
    );
    expect(toJSON()).toMatchSnapshot();
});