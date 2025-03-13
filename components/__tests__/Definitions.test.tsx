import { render } from '@testing-library/react-native';

import Definitions from '@/components/submenuComponents/Definitions';

it(`Definitions Component renders correctly`, () => {
    const { toJSON } = render(
        <Definitions 
            slideIn={true}
            validWords={[
                {
                    word: "word",
                    definition: "test definition"
                }
            ]}
        />
    );
    expect(toJSON()).toMatchSnapshot();
});