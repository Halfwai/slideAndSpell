import React, { useState, useContext, useEffect } from 'react';
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { Session } from '@supabase/supabase-js'

import { useFonts } from 'expo-font';

import { SessionContext } from '@/utils/context';


import { COLOURS }from "@/constants/colours";


export default function RootLayout() {
    const user = useContext(SessionContext);

    const [session, setSession] = useState<Session | null>(null)
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])
    
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
            <SessionContext.Provider value={session}>
                <View style={{ flex: 1, backgroundColor: COLOURS.blue }}>
                    <Stack
                        screenOptions={{
                            // Hide the header for all other routes.
                            headerShown: false,
                            animation: 'slide_from_right',
                        }}
                    />
                </View>
            </SessionContext.Provider>

        </>);
}
