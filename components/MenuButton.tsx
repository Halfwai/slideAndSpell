import React, { useRef, useEffect } from 'react';
import { Text, View, Dimensions, Animated, TouchableOpacity, StyleSheet } from 'react-native';

import { useFocusEffect } from 'expo-router';

import { RFPercentage } from "react-native-responsive-fontsize";

export default function MenuButton(props: { text: string, onPress: Function, delay: number, exitMenu: boolean }) {
    const buttonPosition = useRef(new Animated.Value(Dimensions.get('window').width)).current;
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
            });
        }, props.delay);
    }

    useFocusEffect(() => {
        if(!props.exitMenu) {
            setTimeout(() => {
                slideIn();
            }, props.delay);
        }
    });


    useEffect(() => {
        if (props.exitMenu) {
            slideOut();
        }
    }, [props.exitMenu]);



    return (
        <View style={styles.container}> 
            <Animated.View
                style={[styles.button, {
                    transform: [{ translateX: buttonPosition }],
                }]}                
            >
            <TouchableOpacity
                style={styles.touchable}            
                onPress={() => {
                    props.onPress();
                }}
            >
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
            
            </Animated.View>
        </View>
    );
}


// Define the styles for the MenuButton component
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        position: 'absolute',
        color: 'black', 
        backgroundColor: '#AAA',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        width: "70%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: RFPercentage(4),
        textAlign: 'center',
    }
});