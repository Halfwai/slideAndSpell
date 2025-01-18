import React, { useState } from 'react';
import { Stack } from "expo-router";
import { StatusBar } from "react-native";


export default function RootLayout() {

    return (
        <>
            <StatusBar 
                backgroundColor={"#CBE6F7"}
            />
            <Stack
                screenOptions={{
                    // Hide the header for all other routes.
                    headerShown: false,
                    contentStyle: { backgroundColor: "#CBE6F7" },
                }}
            />
        </>);
}
