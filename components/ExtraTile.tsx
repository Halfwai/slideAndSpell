import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExtraTile(props: { letter: string }) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.letter}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
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