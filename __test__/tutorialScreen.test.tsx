import React from 'react';
import { render } from '@testing-library/react-native';
import TutorialScreen from '@/app/tutorialScreen';

it(`TutorialScreen Component renders correctly`, () => {
    const { toJSON } = render(
        <TutorialScreen/>
    );
    expect(toJSON()).toMatchSnapshot();
});