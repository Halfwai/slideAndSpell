import React, { useState, useEffect } from 'react';
import { Stack } from "expo-router";
import { Alert, StatusBar, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { Session } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { UserContext } from '@/utils/context';
import { Audio, AVPlaybackSource } from 'expo-av';

import { COLOURS } from "@/constants/colours";

// Sets paths for music files
const tracks = [
    require("@/assets/music/moonlight-sonata-classical-piano-241539.mp3"),
    require("@/assets/music/romantic-classical-loop-love-story-277144.mp3"),
    require("@/assets/music/sad-epic-cinematic-music-classical-233797.mp3"),
];


export default function RootLayout() {
    // Sets up the user context
    const [session, setSession] = useState<Session | null>(null)
    const [vibrate, setVibrate] = useState(false);
    const [sound, setSound] = useState(false);

    // Sets up music states
    const [music, setMusic] = useState<Audio.Sound[]>([]);
    const [startMusic, setStartMusic] = useState(false);
    const [track, setTrack] = useState(0);

    
    useEffect(() => {
        // Fix for audio not playing on iOS devices
        Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
        });
        // Get session settings
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        // Get sound and vibrate settings
        getSoundAndVibrateSettings();

        // Load sound files
        for (let track of tracks) {
            loadSound(track);
        }

        // Unload sound files when the app is closed
        return () => {
            if (music.length > 0) {
                music.forEach(loadedMusic => {
                    loadedMusic.unloadAsync();
                    setMusic((music) => {
                        return music.filter(m => m !== loadedMusic);
                    })
                });                
            }
        };
    }, []);

    // Function to load sound files and add them to the music state array
    async function loadSound(track: AVPlaybackSource) {
        const { sound: loadedSound } = await Audio.Sound.createAsync(track);
        setMusic((music) => [...music, loadedSound]);
    }

    // Play music when the music array is loaded
    useEffect(() => {
        if(music.length > 0 && !startMusic) {
            if(sound) {
                music[track].playAsync();
                music[track].setIsLoopingAsync(true);
            }
            setStartMusic(true);
        }
    }, [music])

    // Play or stop music when the sound state changes
    useEffect(() => {
        if (music.length === 0) {
            return;
        }
        if (sound) {
            const newTrack = Math.floor(Math.random() * music.length);
            setTrack(newTrack);
            music[newTrack].playAsync();
            music[newTrack].setIsLoopingAsync(true);
        } else {
            music[track].stopAsync();
        }
    }, [sound]);

    // Object to store the user context
    const contextInput = {
        session: session,
        vibrate: vibrate,
        sound: sound,
        setVibrate: setVibrate,
        setSound: setSound,
    }

    // Function to get sound and vibrate settings from async storage
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

    // Function to set default sound and vibrate settings
    const setupDefaultSettings = async () => {
        try {
            await AsyncStorage.setItem('vibrate', "true");
            await AsyncStorage.setItem('sound', "true");
        } catch (e) {
            Alert.alert("Error setting up default sound and vibrate settings");
        }
    };

    // Load fonts
    const [loaded, error] = useFonts({
        'Postino_std': require('@/assets/fonts/Postino Std Regular.otf'),
        'Quicksand': require('@/assets/fonts/Quicksand.ttf'),
    });

    // Return null if fonts are not loaded
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
        </>
    );
}
