import { View, Text, StyleSheet, Animated } from 'react-native';

import GameBoard from "@/components/Gameboard";
import {COLOURS} from "@/constants/colours";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useRef } from 'react';

interface TutorialProps {
    endTutorial: Function
}

export default function Tutorial(props: TutorialProps) {
    const pointerPosition = useRef(new Animated.ValueXY({ x: 100, y: 0 })).current;
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CBE6F7",
                width: "100%",
            }}
        >

            
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLOURS.blue
            }}>
                <Animated.View style={{position: "absolute",zIndex: 2, justifyContent: "center", alignItems: "center", transform: [{translateX: pointerPosition.x}, {translateY: pointerPosition.y}]}}>
                    <MaterialCommunityIcons name="cursor-pointer" size={40} color="black" /> 
                </Animated.View>
                <GameBoard 
                    gameBoard={[["t", "w","0"], ["t", "i", "o"],["g", "o", "e"]]}
                    extraLetter={"t"}
                    onGameEnd={() => {
                        props.endTutorial();
                    }}
                    hints={[["a", "b"], ["c", "d"]]}
                />
            </View>
        </View>
    )
}   

const styles = StyleSheet.create({

});