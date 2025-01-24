import { View, Text, StyleSheet, Animated, Dimensions, BackHandler } from 'react-native';
import MyAppText from '@/components/MyAppText';
import { COLOURS } from '@/constants/colours';
import { useRef, useEffect } from 'react';
import { RFPercentage } from "react-native-responsive-fontsize";

import { useRouter } from 'expo-router';

interface StatBoxProps {
    stat: string;
    value: number;
    position: 'left' | 'right' | 'bottom';
}

export default function StatBox(props: StatBoxProps) {
    const router = useRouter();

    // if(props.position === 'left') {
    let startPosition = {x: 0, y: 0};
    if (props.position === 'left') {
        startPosition = {x: -Dimensions.get('window').width, y: 0};
    } else if (props.position === 'right') {
        startPosition = {x: Dimensions.get('window').width, y: 0};
    } else if (props.position === 'bottom') {
        startPosition = {x: 0, y: Dimensions.get('window').height};
    }
    let position = useRef(new Animated.ValueXY(startPosition)).current;

    useEffect(() => {
        Animated.timing(position, {
            toValue: {x: 0, y: 0},
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {}, [
        BackHandler.addEventListener('hardwareBackPress', () => {
            Animated.timing(position, {
                toValue: startPosition,
                duration: 500,
                useNativeDriver: true,
            }).start();
            return false; // or return false based on your requirement
        })
    ]);



    return (
        <Animated.View style={[styles.statBox, {transform: [{translateX: position.x}, {translateY: position.y}]}]}>
            <MyAppText style={styles.title}>{props.stat}</MyAppText>
            <MyAppText style={styles.value}>{props.value === null || props.value === undefined ? "-" : props.value}</MyAppText>
        </Animated.View> 
    );
}

const styles = StyleSheet.create({
    statBox: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 10,
        width: 150,
        alignItems: 'center',
        borderColor: COLOURS.green,
        borderWidth: 1,
        height: "100%",
        justifyContent: "center",
    },
    title: {
        fontSize: RFPercentage(2),
        textAlign: 'center',
    },
    value: {
        fontSize: RFPercentage(4),
        textAlign: 'center',
    }
});