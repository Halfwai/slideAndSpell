import { Text, View, Image, StyleSheet, Dimensions, BackHandler } from "react-native";
import MenuButton from "@/components/MenuButton";
import React, { useState } from "react";
import { supabase } from '@/lib/supabase'

import { useRouter, RelativePathString, useFocusEffect } from 'expo-router';

export default function Menu() {
    const [exitMenu, setExitMenu] = useState(false);
    const [slideIn, setSlideIn] = useState(true);

    const router = useRouter();

    const switchRoute = (route: RelativePathString) => {
        setExitMenu(true),
            setTimeout(() => {
                router.push(route);
                setExitMenu(false);
            }, 700);
    }

    useFocusEffect(() => {
        console.log("Infocus")
        if(!exitMenu && !slideIn) {
            setSlideIn(true);
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
            <View style={{
                flex: 2,
                flexDirection: 'column',
                width: "100%",
            }}>
                <MenuButton
                    text="Puzzle of the Day"
                    onPress={() => (
                        switchRoute('/puzzleOfTheDay' as RelativePathString)
                    )}
                    delay={0}
                    exitMenu={exitMenu}
                    slideIn={slideIn}
                />
                <MenuButton
                    text="Endless Mode"
                    onPress={() => (
                        switchRoute('/endlessGame' as RelativePathString)
                    )}
                    delay={100}
                    exitMenu={exitMenu}
                    slideIn={slideIn}
                />
                <MenuButton
                    text="Stats"
                    onPress={() => (
                        switchRoute('/stats' as RelativePathString)
                    )}
                    delay={200}
                    exitMenu={exitMenu}
                    slideIn={slideIn}
                />
                <MenuButton
                    text="Leaderboards"
                    onPress={() => (
                        switchRoute('/leaderboard' as RelativePathString)
                    )}
                    delay={300}
                    exitMenu={exitMenu}
                    slideIn={slideIn}
                />
                <MenuButton
                    text="Settings"
                    onPress={() => (
                        switchRoute('/settings' as RelativePathString)
                    )}
                    delay={400}
                    exitMenu={exitMenu}
                    slideIn={slideIn}
                />
                <View style={{ flexDirection: 'row', flex: 1, width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
                    <View style={{ width: "40%", height: "100%", paddingBottom: "10%" }} >
                        <MenuButton
                            text="Log Out"
                            onPress={async () => {
                                const { error } = await supabase.auth.signOut();
                            }}
                            delay={500}
                            exitMenu={exitMenu}
                            style={{ height: "100%" }}
                            slideIn={slideIn}
                        />
                    </View>
                    <View style={{ width: "40%", height: "100%", paddingBottom: "10%" }} >
                        <MenuButton
                            text="Exit"
                            onPress={() => (
                                BackHandler.exitApp()
                            )}
                            delay={500}
                            exitMenu={exitMenu}
                            style={{ height: "100%" }}
                            slideIn={slideIn}
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
});