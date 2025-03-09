import { render } from '@testing-library/react-native';

import GameBoardTile from '@/components/GameBoardTile';
import { Direction } from '@/constants/enums';

it(`GameBoardTile Component renders correctly`, () => {
    const { toJSON } = render(
        <GameBoardTile 
            value={"A"}
            position={{ y: 0, x: 0 }}
            spaceSize={50}
            tileSize={50}
            slidable={Direction.UP}
            switch={() => {}}
            resetBoard={() => {}}
            valid={true}
            disabled
        />
    );
    expect(toJSON()).toMatchSnapshot();
});