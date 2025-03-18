import React, { useRef, useMemo, useContext } from 'react';
import { View, StyleSheet, Animated, PanResponder, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Import context
import { UserContext } from '@/utils/context';

// Import components
import Tile from '@/components/common/Tile';

// Setup props
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
    // Define the tile position
    const tilePosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    // Calculate the offset for the tile
    const yOffset = props.spaceSize * ((props.boardSize / 2) + 1);
    const xOffset = props.spaceSize * ((props.boardSize - 1) / 2);
    // Get the vibrate setting from the context
    const userContext = useContext(UserContext);
    // Check vibrate settings
    const vibrate = userContext ? userContext.vibrate : false;

    // Function to calculate the distance between the tile and the empty space
    function returnDistanceToZero(x: number, y: number) {
        return Math.sqrt(Math.pow(x - props.zeroPos.x, 2) + Math.pow(y - props.zeroPos.y, 2));
    }

    // Define the panResponder
    const panResponder = useMemo(
        () => PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            // Haptic feedback when the user touches the tile
            onPanResponderGrant: () => {
                // Check if the vibrate setting is true
                if (vibrate) (async () => {
                    Platform.OS !== "web" && await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                })();
            },
            onPanResponderMove: (e, gestureState) => {
                // Move the tile with the user's finger
                tilePosition.x.setValue(gestureState.dx);
                tilePosition.y.setValue(gestureState.dy);
                // Change the colour of the empty space if the tile is close enough
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
            // Move the tile to the empty space when the user releases it and it completes the last word
            onPanResponderRelease: (e, gestureState) => {
                props.setEmptySquareColour(0);
                if (props.canInsert && returnDistanceToZero(gestureState.dx + xOffset, gestureState.dy - props.spaceSize) < props.tileSize) {
                    moveTile(-xOffset + props.zeroPos.x, props.spaceSize + props.zeroPos.y);
                    props.removeZero();
                    return;
                }
                moveTile(0, 0);
            },
        }),
        [props.zeroPos, props.canInsert, vibrate]
    );

    // Function to move the tile
    const moveTile = (x: number, y: number) => {
        Animated.spring(tilePosition, {
            toValue: { x: x, y: y },
            // bounciness set to 0 to prevent the tile from bouncing into other tiles
            bounciness: 0,
            speed: 1000,
            useNativeDriver: true
        }).start()
    };


    return (
        <View style={styles({ tileSize: props.tileSize, yOffset: yOffset }).container}>
            <Animated.View
                style={[
                    styles({ tileSize: props.tileSize, yOffset: yOffset }).tile,
                    {
                        transform: [{ translateX: tilePosition.x }, { translateY: tilePosition.y }],
                    }
                ]}
                // Add the panResponder to the tile
                {...panResponder.panHandlers}
            >
                <Tile letter={props.letter} />
            </Animated.View>
        </View>
    );
}

const styles = (props: { tileSize: number, yOffset: number }) => StyleSheet.create({
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
        borderRadius: 10,
        backgroundColor: '#AAA',
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
    }
});