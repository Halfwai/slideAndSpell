import { render } from '@testing-library/react-native';

import Hints from '@/components/gameComponents/Hints';

it(`Hints Component renders correctly`, () => {
    const { toJSON } = render(
        <Hints 
            startSlideIn={true}
            hints={[
                ["hint 1", "hint 2"],
                ["hint 3", "hint 4"]
            ]}
            tileSize={50}
            spaceSize={50}
        />
    );
    expect(toJSON()).toMatchSnapshot();
});