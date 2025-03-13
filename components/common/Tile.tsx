import { View, Text, StyleSheet } from 'react-native';

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
        fontSize: 24,
        fontFamily: 'Postino_std',
    }
});