import { View, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { COLOURS } from '@/constants/colours';
import React, { useEffect, useState } from 'react';
import { getLeaderboard} from '@/utils/supabaseFunctions';
import { GameBoardFunctions } from '@/utils/gameBoardFunctions';
import Definitions from '@/components/submenuComponents/Definitions';
import InGameBottomMenu from '@/components/submenuComponents/InGameBottomMenu';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import WordsDefinitionsModel from '@/components/modals/WordsDefinitionsModel';

import LeaderboardEntry from '@/components/submenuComponents/LeaderboardEntry';

import MyAppText from '@/components/common/MyAppText';

export default function LeaderBoard() {
    const [leaderboard, setLeaderboard] = useState<any>(null);
    const [validWords, setValidWords] = useState<{ word: string, definition: string }[]>([]);

    const date = new Date();
    const sqlDate = date.toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(sqlDate);
    const [openDatePicker, setOpenDatePicker] = useState(false)

    useEffect(() => {
        setLeaderboard(null);
        getLeaderboard(selectedDate).then((data) => {
            setLeaderboard(data);
        });
    }, [selectedDate]);

    function getDefinitions(gameBoard: string[][]) {
        const { correctWords } = GameBoardFunctions.checkWords(gameBoard);
        setValidWords(correctWords);
    }

    let currentRank = 1;
    let previousRank = 1;
    let currentSlides = 0;
    let currentTime = 0;

    function returnRank(slides: number, time_seconds: number): string {
        if (slides === currentSlides && time_seconds === currentTime) {
            currentRank++;
            return `${previousRank}`;
        }
        currentSlides = slides;
        currentTime = time_seconds;
        previousRank = currentRank;
        return `${currentRank++}`;
    }


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyAppText style={styles.title}>Leaderboard</MyAppText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", width: '100%', padding: 10, flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        let date = new Date(selectedDate);
                        date.setDate(date.getDate() - 1);
                        const dateString = date.toISOString().split('T')[0];
                        setSelectedDate(dateString);
                    }}
                    style={styles.dateButtons}
                >
                    <MaterialCommunityIcons name="skip-previous" size={30} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setOpenDatePicker(true)}
                    style={styles.dateButtons}
                >
                    <MyAppText>{selectedDate}</MyAppText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        let date = new Date(selectedDate);
                        date.setDate(date.getDate() + 1);
                        const dateString = date.toISOString().split('T')[0];
                        setSelectedDate(dateString);
                    }}
                    style={styles.dateButtons}
                >
                    <MaterialCommunityIcons name="skip-next" size={30} color={'black'} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                visible={openDatePicker}
                onRequestClose={() => {
                    setOpenDatePicker(false);
                }}
                transparent={true}
            >
                <WordsDefinitionsModel
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setOpenDatePicker={setOpenDatePicker}
                />

            </Modal>
            <View style={styles.leaderBoardContainer}>
                {leaderboard &&
                    <View style={styles.headerContainer}>
                        <MyAppText style={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Rank</MyAppText>
                        <MyAppText style={{ fontWeight: 'bold', flex: 2, textAlign: 'center' }}>Name</MyAppText>
                        <MyAppText style={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Slides</MyAppText>
                        <MyAppText style={{ fontWeight: 'bold', flex: 1, textAlign: 'center' }}>Time</MyAppText>
                        <View style={{ flex: 1 }} />
                    </View>
                }

                {leaderboard && leaderboard.length != 0 ?
                    <View style={{ width: "100%", height: "90%" }}>
                        <FlatList
                            data={leaderboard}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <LeaderboardEntry
                                    index={returnRank(item.slides, item.time_seconds)}
                                    display_name={item.display_name}
                                    slides={item.slides}
                                    time_seconds={item.time_seconds}
                                    solution={item.solution}
                                    showModel={() => {
                                        getDefinitions(item.solution)
                                    }}
                                />

                            )}
                        />
                    </View>
                    :
                    <MyAppText>No entries yet</MyAppText>
                }


                {validWords.length != 0 &&
                    <Definitions
                        validWords={validWords}
                        slideIn={true}
                        close={() => {
                            setValidWords([]);
                        }}
                    />
                }
            </View>
            <InGameBottomMenu />
            <View style={{ flex: 1.5, justifyContent: 'center', width: '100%', alignItems: 'center' }}>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOURS.blue,
    },
    titleContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        height: "10%",
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "black",
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        height: "10%"
    },
    dateButtons: {
        padding: 10,
        borderWidth: 1,
        borderColor: COLOURS.green,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    leaderBoardContainer: {
        width: "100%",
        flex: 7,
        backgroundColor: "white",
        alignItems: 'center',
        borderWidth: 1,
    }
});