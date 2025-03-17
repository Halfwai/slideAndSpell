import React, { useState, useEffect, useContext } from 'react'
import { View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Import COLOURS
import { COLOURS } from '@/constants/colours'

// Import UserContext
import { UserContext } from '@/utils/context'

// Import components
import Auth from '@/app/auth'
import Menu from '@/app/menu'
import Tutorial from '@/components/submenuComponents/Tutorial'

export default function App() {
    // Tutorial state
    const [runTutorial, setRunTutorial] = useState<boolean | null>(null)
    // User context
    const context = useContext(UserContext);

    // Check to see if the tutorial has been run before
    const getTutorialRun = async () => {
        try {
            const runTutorialSetting = await AsyncStorage.getItem('runTutorial');
            if (runTutorialSetting == null) {
                setupTutorialSettings();
            }
            if (runTutorialSetting !== null) {
                setRunTutorial(runTutorialSetting === "true");
            }
        } catch (e) {
            setupTutorialSettings();
        }
    };

    // Set up the tutorial settings
    const setupTutorialSettings = async () => {
        try {
            await AsyncStorage.setItem('runTutorial', "true");
            setRunTutorial(true);
        } catch (e) {
            Alert.alert('Error', 'Failed to set up tutorial settings');
        }
    };

    // Get the tutorial run status
    useEffect(() => {
        getTutorialRun();
    }, []);

    // Return null if the tutorial is still being checked
    if (runTutorial === null) {
        return null;
    }
    // Return the tutorial if it hasn't been run before
    if (runTutorial === true) {
        return <Tutorial
            endTutorial={() => {
                setRunTutorial(false);
                AsyncStorage.setItem('runTutorial', "false");
            }}
        />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLOURS.blue }}>
            {/* Go to Auth if the user is not signed in */}
            {context && context.session && context.session.user ?
                <Menu />
                :
                <Auth />
            }
        </View>
    )
}
