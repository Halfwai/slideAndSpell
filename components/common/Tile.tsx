import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

// Setup props
interface TileProps {
    letter: string,
}

export default function Tile(props: TileProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.letter}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        height: "100%",
    },
    text: {
        textAlign: 'center',
        fontSize: RFPercentage(3.8),
        fontFamily: 'Postino_std',
    }
});