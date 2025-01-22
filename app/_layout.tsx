import React, { useState } from 'react';
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";

import { useFonts } from 'expo-font';



import { COLOURS }from "@/constants/colours";


export default function RootLayout() {

    
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
            <View style={{ flex: 1, backgroundColor: COLOURS.blue }}>
                <Stack
                    screenOptions={{
                        // Hide the header for all other routes.
                        headerShown: false,
                    }}
                />
            </View>
        </>);
}
