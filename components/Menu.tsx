import { Text, View, Image } from "react-native";
import MenuButton from "@/components/MenuButton";
import React, {useState} from "react";

import { useRouter } from 'expo-router';

export default function Menu(){
    const [exitMenu, setExitMenu] = useState(false);

    const router = useRouter();

    const switchRoute = () => {
        setExitMenu(true),
        setTimeout(() => {
            router.push('/endlessGame');
            setExitMenu(false);
        }, 700);        
    }
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CBE6F7"
            }}
        >
            <Image 
                source={require("@/assets/images/logo.png")}
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
            />
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: 300,
                paddingBottom: 40,
            }}>
                <MenuButton 
                    text="Puzzle of the Day"
                    onPress={() => (
                        console.log("Puzzle of the Day")
                    )}
                    delay={0}
                    exitMenu={exitMenu}
                />
                <MenuButton 
                    text="Endless Mode"
                    onPress={() => (
                        console.log("Endless Mode"),
                        switchRoute()
                    )}
                    delay={100}
                    exitMenu={exitMenu}
                />
                <MenuButton 
                    text="Stats"
                    onPress={() => (
                        console.log("Stats")
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
            </View>
        </View>
    );
    
}