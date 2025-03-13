import { render } from '@testing-library/react-native';

import EmptySquare from '@/components/gameComponents/EmptySquare';

it(`EmptySquare Component renders correctly`, () => {
    const { toJSON } = render(
        <EmptySquare 
            tileSize={50}
            position={{ x: 0, y: 0 }}
            colour={0}
        />
    );
    expect(toJSON()).toMatchSnapshot();
});