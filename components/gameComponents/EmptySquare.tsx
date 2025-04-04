import React from 'react';
import { View, StyleSheet } from 'react-native';

interface EmptySquareProps {
    tileSize: number;
    position: { x: number, y: number };
    colour: number;
}

export default function EmptySquare(props: EmptySquareProps) {
    return (
        <View style={styles(props.tileSize, props.colour, props.position.x, props.position.y).square}></View>
    );
}

const styles = (size: number, colour: number, xPos: number, yPos: number) => StyleSheet.create({
    square: {
        width: size,
        height: size,
        backgroundColor: colour === 0 ? '#FFFFFF' : colour === 1 ? '#8bf0bc' : '#CB4C4E',
        borderRadius: 10,
        zIndex: -1,
        transform: [{translateX: xPos}, {translateY: yPos}]
    }
});