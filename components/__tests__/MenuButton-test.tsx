import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MenuButton from '@/components/MenuButton';

import { NavigationContext } from "@react-navigation/native"

const navContext = {
    isFocused: () => true,
    // addListener returns an unsubscribe function.
    addListener: jest.fn(() => jest.fn()),
    dispatch: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
    canGoBack: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    getParent: jest.fn(),
    navigateDeprecated: jest.fn(),
    preload: jest.fn(),
    getId: jest.fn(),
    getState: jest.fn(),
    setStateForNextRouteNamesChange: jest.fn(),
    setOptions: jest.fn()
  }

it(`MenuButton Component renders correctly`, () => {
    const { toJSON } = render(
        <NavigationContext.Provider value={navContext}>
            <MenuButton 
                text="Test"
                onPress={() => {}}
                delay={1}
                exitMenu={false}
            />
        </NavigationContext.Provider>


    );
    
    expect(toJSON()).toMatchSnapshot();
});

// text: string,
// onPress: Function,
// delay: number,
// exitMenu: boolean,