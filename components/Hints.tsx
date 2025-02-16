import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import RoundButton from '@/components/RoundButton';
import Tile from '@/components/Tile';
import { COLOURS } from '@/constants/colours';

interface HintsProps {
    startSlideIn: Boolean;
    hints: string[][];
}


export default function Hints(props: HintsProps) {
    const hintButtonPosition = useRef(new Animated.ValueXY({ x: -Dimensions.get("screen").width, y: -150 })).current;
    const hintBoardPosition = useRef(new Animated.ValueXY({ x: Dimensions.get("screen").width, y: -200 })).current;
    const [showHints, setShowHints] = useState(false);

    function slideInHintButton() {
        // slide in
        Animated.timing(hintButtonPosition, {
            toValue: { x: 0, y: -150 },
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    function slideHintBoard(){
        if (showHints) {
            Animated.timing(hintBoardPosition, {
                toValue: { x: Dimensions.get("screen").width * 0.25, y: -200 },
                duration: 500,
                useNativeDriver: true
            }).start();
        }
        if (!showHints) {
            Animated.timing(hintBoardPosition, {
                toValue: { x: Dimensions.get("screen").width, y: -200 },
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }

    useEffect(() => {
        slideHintBoard();
    }, [showHints]);


    useEffect(() => {
        if (props.startSlideIn) {
            slideInHintButton();
        }
    }, [props.startSlideIn]);

    return (
        <>
            <Animated.View style={{ transform: [{ translateX: hintButtonPosition.x }, { translateY: hintButtonPosition.y }], ...styles.container }}>
                {props.hints.length > 0 && (
                    <RoundButton icon="lightbulb-on-outline" onPress={() => { setShowHints((showHints) => {return !showHints}) }} iconType="material" colour="" />
                )}
            </Animated.View>

                <View style={styles.container}>
                    {props.hints.map((hint, index) => (
                        <Animated.View key={index} style={{ flexDirection: 'row', transform: [{ translateX: hintBoardPosition.x }, { translateY: hintBoardPosition.y }] }}>
                            {hint.map((letter, letterIndex) => (
                                <View key={letterIndex}style={{ width: 50, height: 50 }}>
                                    <Tile letter={letter} style={{backgroundColor: COLOURS.green}}/>
                                </View>                                
                            ))}
                        </Animated.View>
                    ))}
                </View>

        </>

    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    }
})