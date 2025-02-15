import React, { useRef, useState, useEffect, useMemo, useContext } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ColorSpace } from 'react-native-reanimated';

import { UserContext } from '@/utils/context';

import Tile from '@/components/Tile';

interface ExtraTileProps {
    letter: string;
    tileSize: number;
    spaceSize: number;
    boardSize: number;
    zeroPos: { x: number, y: number };
    canInsert: boolean;
    setEmptySquareColour: Function;
    removeZero: Function;
}

export default function ExtraTile(props: ExtraTileProps) {
    const tilePosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const yOffset = props.spaceSize * ((props.boardSize / 2) + 1);
    const xOffset = props.spaceSize * ((props.boardSize - 1) / 2);

    const userContext = useContext(UserContext);
    const vibrate = userContext ? userContext.vibrate : false;

    function returnDistanceToZero(x : number, y: number) {
        return Math.sqrt(Math.pow(x - props.zeroPos.x, 2) + Math.pow(y - props.zeroPos.y, 2));
    }
   
    // Define the panResponder
    const panResponder = useMemo(
        () => PanResponder.create({       
            onMoveShouldSetPanResponder: () => true,
            // Haptic feedback when the user touches the tile
            onPanResponderGrant: () => {
                if (vibrate) (async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                })();
            },
            onPanResponderMove: (e, gestureState) => {
                tilePosition.x.setValue(gestureState.dx);
                tilePosition.y.setValue(gestureState.dy);                
                const distance = returnDistanceToZero(gestureState.dx + xOffset, gestureState.dy - props.spaceSize);
                if (distance < props.tileSize) {
                    if (props.canInsert) {
                        props.setEmptySquareColour(1);
                    } else {
                        props.setEmptySquareColour(2);
                    }
                } else {
                    props.setEmptySquareColour(0); 
                }
                

            },
            // Move the tile to the empty space when the user releases it
            onPanResponderRelease: (e, gestureState) => {
                props.setEmptySquareColour(0); 
                if(props.canInsert && returnDistanceToZero(gestureState.dx + xOffset, gestureState.dy - props.spaceSize) < props.tileSize) {
                    moveTile(-xOffset + props.zeroPos.x, props.spaceSize + props.zeroPos.y);
                    props.removeZero();
                    return;
                }
                moveTile(0, 0);
            },
        }),
        [props.zeroPos, props.canInsert, vibrate]
    );

    const moveTile = (x: number, y: number) => {
        Animated.spring(tilePosition, {
            toValue: {x: x, y: y},
            // bounciness set to 0 to prevent the tile from bouncing into other tiles
            bounciness: 0,
            speed: 1000,
            useNativeDriver: true
        }).start()
    };
    

    return (
        <View style={styles({tileSize: props.tileSize, yOffset: yOffset}).container}>
            <Animated.View
                style={[
                    styles({tileSize: props.tileSize, yOffset: yOffset}).tile,
                    {
                        transform: [{ translateX: tilePosition.x }, { translateY: tilePosition.y }],
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <Tile letter={props.letter} />
            </Animated.View>
        </View>
    );
}

const styles = (props : {tileSize : number, yOffset : number}) => StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
        zIndex: 1,
        position: 'absolute',
        top: -props.yOffset,
    },
    tile: {
        width: props.tileSize,
        height: props.tileSize,
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#AAA',
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
    }
});