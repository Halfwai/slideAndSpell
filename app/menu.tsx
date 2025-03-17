import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, BackHandler, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, RelativePathString } from 'expo-router';

// Import supabase for logging out
import { supabase } from '@/lib/supabase'

// Import components
import MenuButton from "@/components/buttons/MenuButton";

export default function Menu() {
    // State for the menu animation
    const [exitMenu, setExitMenu] = useState(false);
    const [slideInReady, setSlideInReady] = useState(false);

    // Router for navigation
    const router = useRouter();

    // Function to switch routes with a delay to make the buttons slide out
    const switchRoute = (route: RelativePathString) => {
        setExitMenu(true),
            setTimeout(() => {
                router.push(route);
                setSlideInReady(true);
            }, 700);
    }

    // When the screen is focused, reset the slide in animation so the buttons slide in
    useFocusEffect(() => {
        if (slideInReady) {
            setSlideInReady(false);
            setExitMenu(false);
        }
    });

    return (
        <View
            style={styles.container}
        >
            <Image
                source={require("@/assets/images/logo.png")}
                style={{ height: Dimensions.get('window').height * 0.3, width: "90%" }}
                resizeMode="contain"
            />
            <View style={styles.buttonContainer}>
                <MenuButton
                    text="Puzzle of the Day"
                    onPress={() => (
                        switchRoute('/puzzleOfTheDay' as RelativePathString)
                    )}
                    delay={0}
                    exitMenu={exitMenu}
                />
                <MenuButton
                    text="Endless Mode"
                    onPress={() => (
                        switchRoute('/endlessGame' as RelativePathString)
                    )}
                    delay={100}
                    exitMenu={exitMenu}
                />
                <MenuButton
                    text="Stats"
                    onPress={() => (
                        switchRoute('/stats' as RelativePathString)
                    )}
                    delay={200}
                    exitMenu={exitMenu}
                />
                <MenuButton
                    text="Leaderboards"
                    onPress={() => (
                        switchRoute('/leaderboard' as RelativePathString)
                    )}
                    delay={300}
                    exitMenu={exitMenu}
                />
                <MenuButton
                    text="Settings"
                    onPress={() => (
                        switchRoute('/settings' as RelativePathString)
                    )}
                    delay={400}
                    exitMenu={exitMenu}
                />
                <View style={styles.bottomButtonContainer}>
                    <View style={styles.bottomButton} >
                        <MenuButton
                            text="Log Out"
                            onPress={async () => {
                                const { error } = await supabase.auth.signOut();
                                if (error) {
                                    Alert.alert("Error logging out");
                                }
                            }}
                            delay={500}
                            exitMenu={exitMenu}
                            style={{ height: "100%" }}
                        />
                    </View>
                    <View style={styles.bottomButton} >
                        <MenuButton
                            text="Exit"
                            onPress={() => (
                                BackHandler.exitApp()
                            )}
                            delay={500}
                            exitMenu={exitMenu}
                            style={{ height: "100%" }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#CBE6F7",
    },
    buttonContainer: {
        flex: 2,
        flexDirection: 'column',
        width: "100%",
    },
    bottomButtonContainer: {
        flexDirection: 'row', 
        flex: 1, width: "100%", 
        justifyContent: "space-evenly", 
        alignItems: "center"
    },
    bottomButton: {
        width: "40%", 
        height: "100%", 
        paddingBottom: "10%"
    }
});