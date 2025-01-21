import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface DefinitionProps {
    word: string;
    definition: string;
}


export default function Definition(props: DefinitionProps) {
    return (
        <View style={styles.container}>
            <Text>
                <Text style={styles.nameText}>{props.word}: </Text><Text style={styles.defText}>{props.definition}</Text>
            </Text>            
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
    },
    nameText: {
        fontSize: 18,
        textTransform: 'capitalize',
        fontStyle: 'italic',
    },
    defText: {
        fontSize: 18,
    }
});