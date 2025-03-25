import React from 'react';
import { render } from '@testing-library/react-native';
import Tutorial from '@/components/submenuComponents/Tutorial';

it(`Tutorial Component renders correctly`, () => {
    const { toJSON } = render(
        <Tutorial
            endTutorial={() => {}}
        />
    );    
    expect(toJSON()).toBeTruthy();
});