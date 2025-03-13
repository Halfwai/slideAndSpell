import { render } from '@testing-library/react-native';
import Tile from '@/components/common/Tile';

it(`Tile Component renders correctly`, () => {
    const { toJSON } = render(
        <Tile
            letter='A'
        />
    );    
    expect(toJSON()).toMatchSnapshot();
});