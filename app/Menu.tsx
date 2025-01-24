import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import MenuButton from "@/components/MenuButton";
import React, {useState} from "react";
import { supabase } from '@/lib/supabase'

import { useRouter, RelativePathString } from 'expo-router';

export default function Menu(){
    const [exitMenu, setExitMenu] = useState(false);

    const router = useRouter();

    const switchRoute = (route : RelativePathString) => {
        setExitMenu(true),
        setTimeout(() => {
            router.push(route);
            setExitMenu(false);
        }, 700);        
    }
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
                        console.log("Puzzle of the Day"),
                        switchRoute('/puzzleOfTheDay' as RelativePathString)
                    )}
                    delay={0}
                    exitMenu={exitMenu}
                />
                <MenuButton 
                    text="Endless Mode"
                    onPress={() => (
                        console.log("Endless Mode"),
                        switchRoute('/endlessGame' as RelativePathString)
                    )}
                    delay={100}
                    exitMenu={exitMenu}
                />
                <MenuButton 
                    text="Stats"
                    onPress={() => (
                        console.log("Stats"),
                        switchRoute('/stats' as RelativePathString)
                    )}
                    delay={200}
                    exitMenu={exitMenu}
                />
                <MenuButton 
                    text="Leaderboards"
                    onPress={() => (
                        console.log("Leaderboards")
                    )}
                    delay={300}
                    exitMenu={exitMenu}
                />
                <MenuButton 
                    text="Settings"
                    onPress={() => (
                        console.log("Settings")
                    )}
                    delay={400}
                    exitMenu={exitMenu}
                />
                <View style={{ flexDirection: 'row', flex: 1, width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
                <View style={{ width: "40%", height: "100%" , paddingBottom: "10%"}} >
                    <MenuButton 
                        text="Log Out"
                        onPress={ async () => {
                            const { error } = await supabase.auth.signOut();
                        }}
                        delay={500}
                        exitMenu={exitMenu}
                        style={{ height: "100%" }}
                    />
                </View>
                <View style={{ width: "40%", height: "100%", paddingBottom: "10%" }} >
                    <MenuButton 
                        text="Exit"
                        onPress={() => (
                            console.log("Exit")
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
});