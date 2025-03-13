import { render } from '@testing-library/react-native';

import LeaderboardEntry from '@/components/submenuComponents/LeaderboardEntry';

it(`LeaderboardEntry Component renders correctly`, () => {
    const { toJSON } = render(
        <LeaderboardEntry 
            index="1"
            display_name="Test"
            slides={1}
            time_seconds={1}
            solution={[["a", "b"]]}
            showModel={() => {}}
        />
    );
    expect(toJSON()).toMatchSnapshot();
});