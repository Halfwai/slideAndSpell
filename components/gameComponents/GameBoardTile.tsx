import React, { useEffect, useRef, useState, useContext, useMemo } from 'react';
import { StyleSheet, Animated, PanResponder } from 'react-native';
import * as Haptics from 'expo-haptics';

import Tile from '@/components/common/Tile';

import { COLOURS } from '@/constants/colours';

import { UserContext } from '@/utils/context';

// Import the Direction enum
import { Direction } from '@/constants/enums';

interface GameBoardTileProps {
    value: string,
    position: { y: number, x: number },
    spaceSize: number,
    tileSize: number,
    slidable: Direction,
    switch: Function,
    resetBoard: Function,
    valid: boolean,
    disabled: boolean
}


// Define the Tile component
export default function GameBoardTile(props: GameBoardTileProps) {
    // Define the tilePosition, slidableRef, and colour variables
    const tilePosition = useRef(new Animated.ValueXY({ x: props.position.x, y: props.position.y })).current;
    const slidableRef = useRef(props.slidable);
    const colour = useRef(props.valid ? new Animated.Value(3) : new Animated.Value(0)).current;
    const userContext = useContext(UserContext);
    const vibrate = userContext ? userContext.vibrate : false; 
    const [resetColour, setResetColour] = useState(0);

    useEffect(() => {
        changeColour(props.valid ? 3 : 0);
    }, [props.valid]);

    // Update the slidableRef when props.slidable changes
    useEffect(() => {
        slidableRef.current = props.slidable;
    }, [props.slidable]);

    useEffect(() => {
        changeColour(props.valid ? 3 : 0);
    }, [resetColour]);

    // Define the panResponder
    const panResponder = useMemo(() => 
        PanResponder.create({       
            onMoveShouldSetPanResponder: () => true,
            // Haptic feedback when the user touches the tile
            onPanResponderGrant: () => {
                if (vibrate) (async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                })();
            },
            onPanResponderMove: (e, gestureState) => {
                // Change the colour of the tile when the user moves it. If the tile can be moved it will be blue, otherwise it will be red.
                if (slidableRef.current === Direction.FALSE || props.disabled) {
                    changeColour(2);
                } else {
                    changeColour(1);
                }
                if (props.disabled) return;                
                // Move the tile in the direction the user is moving it. Tile position is locked to the empty space.
                if (slidableRef.current === Direction.RIGHT) {
                    const gestureX = Math.max(Math.min(gestureState.dx, props.spaceSize), 0);
                    tilePosition.x.setValue(props.position.x + gestureX);
                } else if (slidableRef.current === Direction.LEFT) {
                    const gestureX = Math.min(Math.max(gestureState.dx, - props.spaceSize), 0);
                    tilePosition.x.setValue(props.position.x + gestureX);
                } else if (slidableRef.current === Direction.UP) {
                    const gestureY = Math.max(Math.min(gestureState.dy, 0), - props.spaceSize);
                    tilePosition.y.setValue(props.position.y + gestureY);
                } else if (slidableRef.current === Direction.DOWN) {
                    const gestureY = Math.min(Math.max(gestureState.dy, 0), props.spaceSize);
                    tilePosition.y.setValue(props.position.y + gestureY);;
                }
            },
            // Move the tile to the empty space when the user releases it
            onPanResponderRelease: (e, gestureState) => {
                setResetColour(current => current + 1);
                if (props.disabled) return;
                if (slidableRef.current === Direction.RIGHT) {
                    if (gestureState.dx <= 0) return;
                    moveTile({ x: props.position.x +  props.spaceSize, y: props.position.y });
                } else if (slidableRef.current === Direction.LEFT) {
                    if (gestureState.dx >= 0) return;
                    moveTile({ x: props.position.x -  props.spaceSize, y: props.position.y });
                } else if (slidableRef.current === Direction.UP) {
                    if (gestureState.dy >= 0) return;
                    moveTile({ x: props.position.x, y: props.position.y -  props.spaceSize });
                } else if (slidableRef.current === Direction.DOWN) {
                    if (gestureState.dy <= 0) return;
                    moveTile({ x: props.position.x, y: props.position.y +  props.spaceSize });
                }
            },
        }), [vibrate]
    );

    // interpolateColour is used to change the colour of the tile based on the value of the animated colour variable
    const interpolateColour = colour.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: [COLOURS.grey, COLOURS.blue, COLOURS.red, COLOURS.green]
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
        tilePosition.setValue({ x: props.position.x, y: props.position.y });
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
                    <Tile
                         letter={props.value}
                    />
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
        borderRadius: 10,
    },
});