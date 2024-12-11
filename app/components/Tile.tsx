import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { Direction } from '../constants/enums';
import { useEffect, useRef, useState } from 'react';

export default function Tile(props : {value : number, position : {y : number, x: number}, slidable : Direction, switch : Function}) {
    // console.log(props);

    const tilePosition = useRef(new Animated.ValueXY({x: props.position.x * 75, y: props.position.y * 75})).current;
    const slidableRef = useRef(props.slidable);
    const [colour, setColour] = useState('#AAA');

    useEffect(() => {
        slidableRef.current = props.slidable;
    }, [props.slidable]);


    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                setColour('#CBE6F7');
                if (slidableRef.current === Direction.RIGHT) {
                    const gestureX = Math.max(Math.min(gestureState.dx, 75), 0);
                    tilePosition.x.setValue(props.position.x * 75 + gestureX);
                } else if (slidableRef.current === Direction.LEFT) {
                    const gestureX = Math.min(Math.max(gestureState.dx, -75), 0);
                    tilePosition.x.setValue(props.position.x * 75 + gestureX);
                } else if (slidableRef.current === Direction.UP) {
                    const gestureY = Math.min(Math.max(gestureState.dy, -75), 0);
                    tilePosition.y.setValue(props.position.y * 75 + gestureY);
                } else if (slidableRef.current === Direction.DOWN) {
                    const gestureY = Math.max(Math.min(gestureState.dy, 75), 0);
                    tilePosition.y.setValue(props.position.y * 75 + gestureY);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                setColour('#AAA');
                if (slidableRef.current === Direction.RIGHT) {
                    if (gestureState.dx <= 0) return;
                    moveRight();
                } else if (slidableRef.current === Direction.LEFT) {
                    if (gestureState.dx >= 0) return;
                    moveLeft();
                } else if (slidableRef.current === Direction.UP) {
                    if (gestureState.dy >= 0) return;
                    moveUp();
                } else if (slidableRef.current === Direction.DOWN) {
                    if (gestureState.dy <= 0) return;
                    moveDown();
                }
            },
        })
    ).current;   


    useEffect(() => {
        tilePosition.setValue({x: props.position.x * 75, y: props.position.y * 75});
    }, [props.position]);

    function moveRight() {
        Animated.spring(tilePosition.x, {
            toValue: props.position.x * 75 + 75,
            bounciness: 0,
            speed: 50,
            useNativeDriver: true
        }).start(({finished}) => {
            if(!finished) return;
            props.switch(props.position.y, props.position.x);
        });
    }
    function moveLeft() {
        Animated.spring(tilePosition.x, {
            toValue: props.position.x * 75 - 75,
            bounciness: 0,
            speed: 50,
            useNativeDriver: true
        }).start(({finished}) => {
            if(!finished) return;
            props.switch(props.position.y, props.position.x);
        });
    }
    function moveUp() {
        Animated.spring(tilePosition.y, {
            toValue: props.position.y * 75 - 75,
            bounciness: 0,
            speed: 50,
            useNativeDriver: true
        }).start(({finished}) => {
            if(!finished) return;
            props.switch(props.position.y, props.position.x);
        });
    }
    function moveDown() {
        Animated.spring(tilePosition.y, {
            toValue: props.position.y * 75 + 75,
            bounciness: 0,
            speed: 50,
            useNativeDriver: true
        }).start(({finished}) => {
            if(!finished) return;
            props.switch(props.position.y, props.position.x);
        });
    }
    return (
        <>
            { props.value === 0 ? null : 
                <Animated.View 
                    style={[
                        styles.tile,
                        {
                            transform: [{ translateX: tilePosition.x }, { translateY: tilePosition.y }],
                            backgroundColor: colour,
                        }
                    ]}
                    {...panResponder.panHandlers}
                >
                    <Text style={styles.text}>{props.value}</Text>
                </Animated.View>
            }

        </>
    );
}

const styles = StyleSheet.create({
    tile: {
        width: 75,
        height: 75,
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