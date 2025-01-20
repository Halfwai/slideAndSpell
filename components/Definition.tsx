import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface DefinitionProps {
    word: string;
    definition: string;
}


export default function Definition(props: DefinitionProps) {
    // console.log(props.word, props.definition);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.word}: {props.definition}</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // alignItems: 'center',
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    text: {
        fontSize: 20,
        textTransform: 'capitalize'
    }
});