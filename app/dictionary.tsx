import { View, StyleSheet, ScrollView } from 'react-native';
import MyAppText from '@/components/common/MyAppText';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { COLOURS } from '@/constants/colours';
import Definition from '@/components/submenuComponents/Definition';
import { checkWord } from '@/utils/gameBoardFunctions';

import InGameBottomMenu from '@/components/submenuComponents/InGameBottomMenu';
import { getDefinition } from '@/utils/helperFunctions';


export default function Dictionary() {
    const params = useLocalSearchParams();
    const word: string = Array.isArray(params.word) ? params.word[0] : params.word;
    const [definitions, setDefinitions] = useState<{ definition: string, example?: string }[]>([]);

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

