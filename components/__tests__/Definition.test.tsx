import { render } from '@testing-library/react-native';

import Definition from '@/components/submenuComponents/Definition';

it(`Definition Component renders correctly`, () => {
    const { toJSON } = render(
        <Definition word={"test"} definition={"a test definition"} example={"test example"} />
    );
    expect(toJSON()).toMatchSnapshot();
});