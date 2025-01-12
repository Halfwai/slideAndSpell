// Import necessary libraries
import { Text, StyleSheet, Animated, PanResponder, ImageSize } from 'react-native';
import { useEffect, useRef } from 'react';
import React from 'react';
import * as Haptics from 'expo-haptics';

// Import the Direction enum
import { Direction } from '@/constants/enums';

// Define the Tile component
export default function Tile(props: { value: string | number, position: { y: number, x: number }, spaceSize : number, tileSize : number, slidable: Direction, switch: Function, resetBoard: Function, valid: boolean }) {
    // Define the tilePosition, slidableRef, and colour variables
    const tilePosition = useRef(new Animated.ValueXY({ x: props.position.x * (props.spaceSize), y: props.position.y * (props.spaceSize) })).current;
    const slidableRef = useRef(props.slidable);
    const colour = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let newColour = props.valid ? 3 : 0;
        changeColour(newColour);

    }, [props.valid]);

    // Update the slidableRef when props.slidable changes
    useEffect(() => {
        slidableRef.current = props.slidable;
    }, [props.slidable]);

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
                // Change the colour of the tile when the user moves it. If the tile can be moved it will be blue, otherwise it will be red.
                if (slidableRef.current === Direction.FALSE) {
                    changeColour(2);
                } else {
                    changeColour(1);
                }
                
                // Move the tile in the direction the user is moving it. Tile position is locked to the empty space.
                if (slidableRef.current === Direction.RIGHT) {
                    const gestureX = Math.max(Math.min(gestureState.dx, props.spaceSize), 0);
                    tilePosition.x.setValue(props.position.x * (props.spaceSize) + gestureX);
                } else if (slidableRef.current === Direction.LEFT) {
                    const gestureX = Math.min(Math.max(gestureState.dx, - props.spaceSize), 0);
                    tilePosition.x.setValue(props.position.x * (props.spaceSize) + gestureX);
                } else if (slidableRef.current === Direction.UP) {
                    const gestureY = Math.max(Math.min(gestureState.dy, 0), - props.spaceSize);
                    tilePosition.y.setValue(props.position.y * (props.spaceSize) + gestureY);
                } else if (slidableRef.current === Direction.DOWN) {
                    const gestureY = Math.min(Math.max(gestureState.dy, 0), props.spaceSize);
                    tilePosition.y.setValue(props.position.y * (props.spaceSize) + gestureY);;
                }
            },
            // Move the tile to the empty space when the user releases it
            onPanResponderRelease: (e, gestureState) => {
                if (slidableRef.current === Direction.RIGHT) {
                    if (gestureState.dx <= 0) return;
                    moveTile({ x: props.position.x *  props.spaceSize +  props.spaceSize, y: props.position.y *  props.spaceSize });
                } else if (slidableRef.current === Direction.LEFT) {
                    if (gestureState.dx >= 0) return;
                    moveTile({ x: props.position.x *  props.spaceSize -  props.spaceSize, y: props.position.y *  props.spaceSize });
                } else if (slidableRef.current === Direction.UP) {
                    if (gestureState.dy >= 0) return;
                    moveTile({ x: props.position.x *  props.spaceSize, y: props.position.y *  props.spaceSize -  props.spaceSize });
                } else if (slidableRef.current === Direction.DOWN) {
                    if (gestureState.dy <= 0) return;
                    moveTile({ x: props.position.x *  props.spaceSize, y: props.position.y *  props.spaceSize +  props.spaceSize });
                }
            },
        })
    ).current;

    // interpolateColour is used to change the colour of the tile based on the value of the animated colour variable
    const interpolateColour = colour.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: ['#AAA', '#CBE6F7', "#CB4C4E", "#8bf0bc"]
    });

    // changeColour is used to change the colour of the tile
    const changeColour = (target: number) => {
        Animated.timing(colour, {
            toValue: target,
            duration: 1,
            useNativeDriver: true
        }).start();
    }

    // useEffect to update the tilePosition when props.position changes
    useEffect(() => {
        tilePosition.setValue({ x: props.position.x * (props.spaceSize), y: props.position.y * (props.spaceSize) });
    }, [props.position]);

    
    // moveTile function moves the tile to the destination
    function moveTile(destination: { x: number, y: number }) {
        Animated.spring(tilePosition, {
            toValue: {x: destination.x, y: destination.y},
            // bounciness set to 0 to prevent the tile from bouncing into other tiles
            bounciness: 0,
            // speed set to 1000 to make the animation feel more responsive
            speed: 1000,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (!finished) return;
            // switch the tile with the empty space in the board when the animation is finished
            const newBoard = props.switch(props.position.y, props.position.x);
            if (newBoard === undefined) return;
            props.resetBoard(newBoard);
        });
    }

    return (
        <>
            {props.value === "0" ? null :
                <Animated.View
                    style={[
                        styles(props.tileSize).tile,
                        {
                            transform: [{ translateX: tilePosition.x }, { translateY: tilePosition.y }],
                            backgroundColor: interpolateColour,
                        }
                    ]}
                    {...panResponder.panHandlers}
                >
                    <Text style={styles().text}>{props.value}</Text>
                </Animated.View>
            }
        </>
    );
}

// Define the styles for the Tile component
const styles = (props : number | undefined) => StyleSheet.create({
    tile: {
        width: props,
        height: props,
        margin: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
    }
});