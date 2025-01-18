import React, { useState } from 'react';
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";


export default function RootLayout() {

    return (
        <>
            <StatusBar 
                backgroundColor={"#CBE6F7"}
            />
            <View style={{ flex: 1, backgroundColor: "#CBE6F7" }}>
                <Stack
                    screenOptions={{
                        // Hide the header for all other routes.
                        headerShown: false,
                    }}
                />
            </View>

        </>);
}
