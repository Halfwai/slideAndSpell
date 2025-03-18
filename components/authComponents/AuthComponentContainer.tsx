import React, { useRef, useEffect, useState} from 'react'
import { StyleSheet, Animated, Keyboard, Dimensions } from 'react-native'

// Import COLOURS
import { COLOURS } from '@/constants/colours'

// Setup props
interface AuthComponentContainerProps {
    position: {x: number, y: number},
    children: React.ReactNode,
}

export default function Welcome(props: AuthComponentContainerProps) {
    // Setup animation and zIndex 
    const position = useRef(new Animated.ValueXY({x: props.position.x, y: props.position.y})).current;
    const [zIndex, setZIndex] = useState(0);

    // Get logo height
    const logoHeight = Dimensions.get('window').height * 0.3;

    // Slides the component to the correct position when it's position changes
    useEffect(() => {
        if(props.position.y === 0 && props.position.x === 0) {
            setZIndex(0);
            const timer = setTimeout(() => {
                Keyboard.dismiss();
                slide(props.position.x, props.position.y)
            }, 500)
            return () => clearTimeout(timer);
        }
        // If the keyboard is visible, the component slides parallel to the keyboard
        if(Keyboard.isVisible()) {
            slide(props.position.x, props.position.y -  logoHeight); 
        } else {
            slide(props.position.x, props.position.y);
        }        
    }, [props.position]);

    // Function to slide the component to the correct position
    function slide(x: number, y: number) {
        Animated.timing(position, {
            toValue: { x: x, y: y },
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    // Listen for keyboard events
    useEffect(() => {
        // If the keyboard is visible, slide the component up to make space for the keyboard
        const withKeyBoard = Keyboard.addListener('keyboardDidShow', () => {
            setZIndex(1);
            slide(props.position.x, props.position.y - logoHeight);
        })
        const withoutKeyboard = Keyboard.addListener('keyboardDidHide', () => {
            slide(props.position.x, props.position.y);
        })
        // Remove the listeners when the component is unmounted
        return () => {
            withKeyBoard.remove();
            withoutKeyboard.remove();
        }
    }, [props.position])

    return(
        <Animated.View style={styles({position, zIndex}).container}>
            {props.children}
        </Animated.View>
    )
}

const styles = (props: {position : Animated.ValueXY, zIndex : number}) => StyleSheet.create({
    container: {
        transform: [{ translateX: props.position.x }, { translateY: props.position.y }], 
        position: "absolute", 
        width: '100%', 
        alignItems: 'center',
        zIndex: props.zIndex,
        backgroundColor: COLOURS.blue,
    }
})