import { render } from '@testing-library/react-native';

import InGameBottomMenu from '@/components/submenuComponents/InGameBottomMenu';

it(`InGameBottomMenu Component renders correctly`, () => {
    const { toJSON } = render(
        <InGameBottomMenu />
    );
    expect(toJSON()).toMatchSnapshot();
});