import React from 'react';
import { render } from '@testing-library/react-native';

import GameBoard from '@/components/gameComponents/GameBoard';

it(`GameBoard Component renders correctly`, () => {
    const { toJSON } = render(
        <GameBoard 
            gameBoard={[
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "0"]
            ]}
            extraLetter={"P"}
            onGameEnd={() => {}}
            hints={[
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "P"]
            ]}
            returnCompleteWords={() => {}}
        />
    );
    expect(toJSON()).toMatchSnapshot();
});