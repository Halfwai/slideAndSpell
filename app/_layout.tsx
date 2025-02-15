import React, { useState, useContext, useEffect } from 'react';
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { Session } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

import { UserContext } from '@/utils/context';
import { Audio } from 'expo-av';
import { useAudioPlayer } from 'expo-audio';

import { COLOURS }from "@/constants/colours";


export default function RootLayout() {
    const [session, setSession] = useState<Session | null>(null)
    const [vibrate, setVibrate] = useState(true);
    const [sound, setSound] = useState(true);

    const [music, setMusic] = useState<Audio.Sound | null>(null);

    useEffect(() => {
      Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    }, []);
  
    useEffect(() => {
      let loadedMusic: Audio.Sound | null = null;
  
      async function loadSound() {
        const { sound: loadedSound } = await Audio.Sound.createAsync(
          require('@/assets/music/moonlight-sonata-classical-piano-241539.mp3')
        );
        loadedMusic = loadedSound;
        setMusic(loadedMusic);  
        await loadedMusic.playAsync();

      }
  
      loadSound();  
      // Cleanup to unload the sound
      return () => {
        if (loadedMusic) {
          loadedMusic.unloadAsync();
        }
      };
    }, []);

    useEffect(() => {
        if (sound) {
            music?.playAsync();
        } else {
            music?.stopAsync();
        }
    }, [sound]);

    const contextInput = {
        session: session,
        vibrate: vibrate,
        sound: sound,
        setVibrate: setVibrate,
        setSound: setSound,
    }

    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        getSoundAndVibrateSettings();
    }, [])

    // useEffect(() => {
    //     try {            
    //         player.play();
    //         console.log("sound played");
    //     } catch (e) {
    //         console.error(e);
    //     }        
    // }, [sound]);


    const getSoundAndVibrateSettings = async () => {
        try {
            const vibrateValue = await AsyncStorage.getItem('vibrate');
            const soundValue = await AsyncStorage.getItem('sound');
        if (vibrateValue !== null && soundValue !== null) {
            setVibrate(vibrateValue === 'true');
            setSound(soundValue === 'true');
        }
        } catch (e) {
            setupDefaultSettings();
        }
    };

    const setupDefaultSettings = async () => {
        try {
            await AsyncStorage.setItem('vibrate', "true");
            await AsyncStorage.setItem('sound', "true");
        } catch (e) {
            console.error(e);
        }
    };
    
    const [loaded, error] = useFonts({
        'Postino_std': require('@/assets/fonts/Postino Std Regular.otf'),
        'Quicksand': require('@/assets/fonts/Quicksand.ttf'),
    });

    if (!loaded) {
        return null;
    }
    
    return (
        <>
            <StatusBar 
                backgroundColor={COLOURS.blue}
            />
            <UserContext.Provider value={contextInput}>
                <View style={{ flex: 1, backgroundColor: COLOURS.blue }}>
                    <Stack
                        screenOptions={{
                            // Hide the header for all other routes.
                            headerShown: false,
                            animation: 'slide_from_right',
                        }}
                    />
                </View>
            </UserContext.Provider>

        </>);
}
