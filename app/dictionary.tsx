import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MyAppText from '@/components/MyAppText';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { COLOURS } from '@/constants/colours';
import Definition from '@/components/Definition';
import { GameBoardFunctions } from '@/utils/gameBoardFunctions';

import InGameBottomMenu from '@/components/InGameBottomMenu';

export default function Dictionary() {
    const params = useLocalSearchParams();
    const word: string = Array.isArray(params.word) ? params.word[0] : params.word;
    const [definitions, setDefinitions] = useState<{ definition: string, example?: string }[]>([]);

    useEffect(() => {
        const currentDefinition = GameBoardFunctions.checkWord(word);
        getDefinition(word, currentDefinition);
    }, []);    
   
    async function getDefinition(word: string, currentDefinition: string) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        let definitions;
        try {
            definitions = data[0].meanings[0].definitions;
            if (currentDefinition.toLowerCase() !== definitions[0].definition.toLowerCase()) {
                console.log('here');
                definitions.splice(0, 0, { definition: currentDefinition });
            }
        } catch (error) {
            definitions = [{ definition: currentDefinition }];
        }
        setDefinitions(definitions);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyAppText style={styles.title}>{word}</MyAppText>  
            </View>
            {definitions.length != 0 && (
                <View style={styles.definitionContainer}>
                    <ScrollView>
                        {definitions.map((definition, index) => {
                            return (                            
                                <Definition key={index} definition={definition.definition} example={definition.example}/>
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

