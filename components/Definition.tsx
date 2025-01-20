import { View, Text, StyleSheet } from 'react-native';

interface DefinitionProps {
    word: string;
    definition: string;
}


export default function Definition(props: DefinitionProps) {
    console.log(props.word, props.definition);
    return (
        <View style={styles.container}>
            <Text>{props.word}</Text>
            <Text>{props.definition}</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        width: "90%",
    }
});