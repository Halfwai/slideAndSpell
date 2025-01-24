import { View, TouchableOpacity, StyleSheet, Animated, Keyboard, Dimensions } from 'react-native'
import { COLOURS } from '@/constants/colours'
import MyAppText from '@/components/MyAppText'
import AuthButton from '@/components/AuthButton'

import { useRef, useEffect, useState} from 'react'

interface AuthComponentContainerProps {
    position: {x: number, y: number},
    setSlideIn: Function,
    children: React.ReactNode,
}

export default function Welcome(props: AuthComponentContainerProps) {
    const position = useRef(new Animated.ValueXY({x: props.position.x, y: props.position.y})).current;
    const [zIndex, setZIndex] = useState(0);

    const logoHeight = Dimensions.get('window').height * 0.3;

    useEffect(() => {
        if(props.position.y === 0 && props.position.x === 0) {
            setZIndex(0);
            setTimeout(() => {
                Keyboard.dismiss();
                slide(props.position.x, props.position.y)
            }, 500)
            return;
        }
        if(Keyboard.isVisible()) {
            slide(props.position.x, props.position.y -  logoHeight); 
        } else {
            slide(props.position.x, props.position.y);
        }        
    }, [props.position]);


    function slide(x: number, y: number) {
        Animated.timing(position, {
            toValue: { x: x, y: y },
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        const withKeyBoard = Keyboard.addListener('keyboardDidShow', () => {
            setZIndex(1);
            slide(props.position.x, props.position.y - logoHeight);
        })
        const withoutKeyboard = Keyboard.addListener('keyboardDidHide', () => {
            slide(props.position.x, props.position.y);
        })
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