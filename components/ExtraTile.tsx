import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function ExtraTile(props: { letter: string, tileSize: number, zeroPos: { x: number, y: number }}) {
    const tilePosition = useRef(new Animated.ValueXY({ x: 0, y: -props.tileSize * 1.5 })).current;

    function returnDistanceToZero(x : number, y: number) {
        return Math.abs(x - props.zeroPos.x) + Math.abs(y - props.zeroPos.y);
    }
   
    // Define the panResponder
    const panResponder = useRef(
        PanResponder.create({       
            onMoveShouldSetPanResponder: () => true,
            // Haptic feedback when the user touches the tile
            onPanResponderGrant: () => {
                (async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                })();
            },
            onPanResponderMove: (e, gestureState) => {
                tilePosition.x.setValue(gestureState.dx);
                tilePosition.y.setValue(gestureState.dy - props.tileSize * 1.5);
                console.log(returnDistanceToZero(gestureState.dx, gestureState.dy - props.tileSize * 1.5));

            },
            // Move the tile to the empty space when the user releases it
            onPanResponderRelease: (e, gestureState) => {
                moveTile();
            },
        })
    ).current;

    const moveTile = () => {
        Animated.spring(tilePosition, {
            toValue: {x: 0, y: -props.tileSize * 1.5},
            // bounciness set to 0 to prevent the tile from bouncing into other tiles
            bounciness: 0,
            // speed set to 1000 to make the animation feel more responsive
            speed: 1000,
            useNativeDriver: true
        }).start();
    };


    return (
        <View style={styles(props.tileSize).container}>
            <Animated.View
                style={[
                    styles(props.tileSize).tile,
                    {
                        transform: [{ translateX: tilePosition.x }, { translateY: tilePosition.y }],
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <Text style={styles(props.tileSize).text}>{props.letter}</Text>
            </Animated.View>
        </View>

    );
}

const styles = (props : number) => StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
    },
    tile: {
        width: props,
        height: props,
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