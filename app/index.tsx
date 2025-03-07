import 'react-native-url-polyfill/auto'
import { useState, useEffect, useContext } from 'react'
import Auth from '@/app/auth'

import Menu from '@/app/menu'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

import { COLOURS } from '@/constants/colours'

import { UserContext } from '@/utils/context'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Tutorial from '@/components/Tutorial'


export default function App() {
    const [runTutorial, setRunTutorial] = useState<boolean | null>(true)

    const context = useContext(UserContext);
    
    const getTutorialRun = async () => {
        // try {
        //     const runTutorialSetting = await AsyncStorage.getItem('runTutorial');
        //     if (runTutorialSetting == null) {
        //         setupTutorialSettings();
        //     }
        //     if (runTutorialSetting !== null) {
        //         setRunTutorial(runTutorialSetting === "true");
        //     }
        // } catch (e) {
        //     setupTutorialSettings();
        // }
    };

    const setupTutorialSettings = async () => {
        try {
            await AsyncStorage.setItem('runTutorial', "true");
            setRunTutorial(true);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getTutorialRun();
    }, []);

    if (runTutorial === null) {
        console.log("Run tutorial is null");
        return null;
    }

    if (runTutorial === true) {
        return <Tutorial 
            endTutorial={() => {
                setRunTutorial(false);
                AsyncStorage.setItem('runTutorial', "false");
            }}
        />;
    }


    
    return (
        <View style={{flex: 1, backgroundColor: COLOURS.blue}}>            
            {context && context.session && context.session.user ? 
                <Menu />
                    : 
                <Auth />
            }
        </View>
    )
}
