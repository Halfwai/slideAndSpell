import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import COLOURS
import { COLOURS } from '@/constants/colours';

// Import functions
import { getLeaderboard } from '@/utils/supabaseFunctions';
import { checkWords } from '@/utils/gameBoardFunctions';

// Import components
import Definitions from '@/components/submenuComponents/Definitions';
import InGameBottomMenu from '@/components/submenuComponents/InGameBottomMenu';
import WordsDefinitionsModel from '@/components/modals/WordsDefinitionsModel';
import LeaderboardEntry from '@/components/submenuComponents/LeaderboardEntry';
import MyAppText from '@/components/common/MyAppText';

export default function LeaderBoard() {
    // Set up state
    const [leaderboard, setLeaderboard] = useState<any>(null);
    const [validWords, setValidWords] = useState<{ word: string, definition: string }[]>([]);

    // Set up date state for date picker
    const date = new Date();
    const sqlDate = date.toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(sqlDate);
    const [openDatePicker, setOpenDatePicker] = useState(false)

    // Get leaderboard data when the date changes
    useEffect(() => {
        setLeaderboard(null);
        getLeaderboard(selectedDate).then((data) => {
            setLeaderboard(data);
        });
    }, [selectedDate]);

    // Get definitions for the words in the solution
    function getDefinitions(gameBoard: string[][]) {
        const { correctWords } = checkWords(gameBoard);
        setValidWords(correctWords);
    }

    // Variables to set up the rank of the leaderboard entry
    let currentRank = 1;
    let previousRank = 1;
    let currentSlides = 0;
    let currentTime = 0;

    // Function to return the rank of the leaderboard entry
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
            <View style={styles.datePickerContainer}>
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
                        <MyAppText style={[styles.headerText, {flex: 1}]}>Rank</MyAppText>
                        <MyAppText style={[styles.headerText, {flex: 2}]}>Name</MyAppText>
                        <MyAppText style={[styles.headerText, {flex: 1}]}>Slides</MyAppText>
                        <MyAppText style={[styles.headerText, {flex: 1}]}>Time</MyAppText>
                        <View style={{ flex: 1 }} />
                    </View>
                }
                {leaderboard && leaderboard.length != 0 ?
                    <View style={styles.flatListContainer}>
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
            <View style={styles.bottomBlock}>
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
    datePickerContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: "center", 
        width: '100%', 
        padding: 10, 
        flex: 1
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
    },
    headerText: {
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    bottomBlock: {
        flex: 1.5, 
        justifyContent: 'center', 
        width: '100%', 
        alignItems: 'center'
    }, 
    flatListContainer: {
        width: "100%", 
        height: "90%"
    }
});