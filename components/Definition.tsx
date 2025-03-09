import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLOURS } from '@/constants/colours';
import MyAppText from '@/components/MyAppText';
import { Link } from 'expo-router';

interface DefinitionProps {
    word?: string;
    definition: string;
    example?: string;
}


export default function Definition(props: DefinitionProps) {
    return (
        <View style={styles.container}>
            <MyAppText>
                {props.word && <MyAppText style={styles.nameText}>{props.word}: </MyAppText>}
                <MyAppText style={styles.defText}>{props.definition}</MyAppText>
            </MyAppText>
            {props.example && (
                <MyAppText style={styles.example}>"{props.example}"</MyAppText>
            )}
            {props.word &&
            <Link href={`/dictionary?word=${props.word}`} style={styles.link}>
                <MyAppText>More info</MyAppText>
            </Link>
            }            
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 10,
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderColor: COLOURS.green

    },
    nameText: {
        fontSize: 18,
        textTransform: 'capitalize',
        fontStyle: 'italic',
    },
    defText: {
        fontSize: 18,
    },
    link: {
        marginTop: 10,
        alignSelf: 'flex-end',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    },
    example: {
        fontStyle: 'italic',
        fontSize: 16,
    }
});