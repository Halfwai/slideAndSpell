import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

// Import COLOURS
import { COLOURS } from '@/constants/colours';
import { SIZES } from '@/constants/sizes';

// Setup props
interface ScoreComponentProps {
    slides: number;
    incrementTime: boolean;
    gameOver: boolean;
    returnTime: Function;
    slideUp: boolean;
}

export default function ScoreComponents(props: ScoreComponentProps) {
    // Setup animation values
    const timeXPos = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
    const slidesXPos = useRef(new Animated.Value(Dimensions.get('window').width)).current;
    const slideYPos = useRef(new Animated.Value(SIZES.GAMEBOARD / 1.5)).current;
    // Setup ref for incrementTime
    const incrementTimeRef = useRef(props.incrementTime);

    // Update incrementTimeRef when props.incrementTime changes
    useEffect(() => {
        incrementTimeRef.current = props.incrementTime;
    }, [props.incrementTime]);

    // Slide up animation
    useEffect(() => {
        if (props.slideUp) {
            animateSlideUp();
        }
    }, [props.slideUp]);

    // Return time when game is over
    useEffect(() => {
        if (props.gameOver) {
            props.returnTime(time);
        }
    }, [props.gameOver]);

    // Setup time state
    const [time, setTime] = useState(0);

    // Increment time function
    function increment() {
        if (!incrementTimeRef.current) return;
        setTime((time) => time + 1);
    }

    // Formats the time into a readable string
    function returnTimeString() {
        const seconds = time % 60;
        const minutes = Math.floor(time / 60) % 60;
        const hours = Math.floor(time / 3600);
        return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    // increment time function adapted from here - https://iq.js.org/questions/react/how-to-update-a-component-every-second
    useEffect(() => {
        const interval = setInterval(() => {
            increment();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Slide score components in each side
    useEffect(() => {
        Animated.timing(timeXPos, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
        Animated.timing(slidesXPos, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }, []);

    // Slide up animation
    function animateSlideUp() {
        Animated.timing(slideYPos, {
            toValue: -Dimensions.get('window').height * 0.44,
            duration: 200,
            useNativeDriver: true
        }).start();
    }


    return (
        <View style={styles.container}>
            <Animated.View style={[styles.itemBox, { transform: [{ translateX: timeXPos }, { translateY: slideYPos }] }]}>
                <Text style={styles.itemText}>Time</Text>
                <Text style={styles.itemText}>{returnTimeString()}</Text>
            </Animated.View>
            <Animated.View style={[styles.itemBox, { transform: [{ translateX: slidesXPos }, { translateY: slideYPos }] }]}>
                <Text style={styles.itemText}>Slides</Text>
                <Text style={styles.itemText}>{props.slides}</Text>
            </Animated.View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 20,
        zIndex: 0,
        position: 'absolute',
    },
    itemBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 2,
        backgroundColor: COLOURS.green,
        paddingVertical: 10,
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderColor: 'white',
    },
    itemText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
});