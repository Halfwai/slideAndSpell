import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Import COLOURS
import { COLOURS } from '@/constants/colours';

// Import functions
import { checkWord } from '@/utils/gameBoardFunctions';
import { getDefinition } from '@/utils/helperFunctions';

// Import components
import InGameBottomMenu from '@/components/submenuComponents/InGameBottomMenu';
import Definition from '@/components/submenuComponents/Definition';
import MyAppText from '@/components/common/MyAppText';

export default function Dictionary() {
    // Get the word from the URL
    const params = useLocalSearchParams();
    const word: string = Array.isArray(params.word) ? params.word[0] : params.word;
    // Set the definitions
    const [definitions, setDefinitions] = useState<{ definition: string, example?: string }[]>([]);

    // Get the definitions for the word
    useEffect(() => {
        const currentDefinition = checkWord(word);
        getDefinition(word, currentDefinition).then((data) => {
            setDefinitions(data);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyAppText style={styles.title}>{word}</MyAppText>
            </View>
            {definitions.length === 0 ?
                <MyAppText>Definitions Loading...</MyAppText>
                :
                (
                    <View style={styles.definitionContainer}>
                        <ScrollView>
                            {definitions.map((definition, index) => {
                                return (
                                    <Definition key={index} definition={definition.definition} example={definition.example} />
                                )
                            })}
                        </ScrollView>
                    </View>
                )}
            <InGameBottomMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOURS.blue
    },
    titleContainer: {
        height: "10%",
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    title: {
        fontSize: 35,
    },
    definitionContainer: {
        height: "75%",
        backgroundColor: COLOURS.green
    },
});

