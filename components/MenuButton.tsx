import React, { useRef, useEffect, useContext } from 'react';
import { View, Dimensions, Animated, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

import { useFocusEffect, usePathname } from 'expo-router';

import { RFPercentage } from "react-native-responsive-fontsize";

import MyAppText from '@/components/MyAppText';

import { COLOURS } from '@/constants/colours';
import { UserContext } from '@/utils/context';
import * as Haptics from 'expo-haptics';

interface MenuButtonProps {
    text: string,
    onPress: Function,
    delay: number,
    exitMenu: boolean,
    style?: {height: number | string | undefined},
    slideIn?: boolean,
}

export default function MenuButton(props: MenuButtonProps) {
    // console.log(usePathname());

    const userContext = useContext(UserContext);
    const buttonPosition = useRef(new Animated.Value(Dimensions.get('window').width)).current;
    const [colour, setColour] = React.useState("white");
    function slideIn() {
        Animated.timing(buttonPosition, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    function slideOut() {
        setTimeout(() => {
            Animated.timing(buttonPosition, {
                toValue: -Dimensions.get('window').width,
                duration: 500,
                useNativeDriver: true
            }).start(({ finished }) => {
                if (!finished) return;
                setColour("white");
            });
        }, props.delay);
    }

    useEffect(() => {
        if (!props.exitMenu) {
            setTimeout(() => {
                slideIn();
            }, props.delay);
        }
    }, [props.slideIn]);


    useEffect(() => {
        if (props.exitMenu) {
            slideOut();
        }
    }, [props.exitMenu]);



    return (
        <View style={styles(colour).container}>
            <Animated.View
                style={[styles(colour).button, {
                    transform: [{ translateX: buttonPosition }],
                }]}
            >
                <TouchableOpacity
                    style={[styles(colour).touchable, props.style as ViewStyle]}
                    onPress={async() => {
                        if (userContext && userContext.vibrate) {
                            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        }
                        props.onPress();
                        setColour(COLOURS.green);
                    }}
                    testID="menuButton"
                >
                    <MyAppText style={styles(colour).text}>{props.text}</MyAppText>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}


// Define the styles for the MenuButton component
const styles = (colour: string) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        width: '100%',
    },
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colour,
        borderColor: COLOURS.green,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: "80%",
        
    },
    text: {
        color: 'black',
        fontSize: RFPercentage(3.8),
        textAlign: 'center',
    }
});