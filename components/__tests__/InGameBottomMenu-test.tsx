import { render } from '@testing-library/react-native';

import InGameBottomMenu from '@/components/InGameBottomMenu';

it(`InGameBottomMenu Component renders correctly`, () => {
    const { toJSON } = render(
        <InGameBottomMenu />
    );
    expect(toJSON()).toMatchSnapshot();
});