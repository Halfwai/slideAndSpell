import React from 'react';
import{Text, TextStyle, StyleSheet} from 'react-native';

// Setup props
interface MyAppTextProps {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
}

export default function MyAppText(props: MyAppTextProps) {
    return <Text style={[styles.text, props.style]}>{props.children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Quicksand'
    }
});