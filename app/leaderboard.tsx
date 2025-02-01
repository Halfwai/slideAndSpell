import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import { COLOURS } from '@/constants/colours';
import { useEffect, useState } from 'react';
import { Supabase } from '@/utils/supabaseFunctions';
import { GameBoardFunctions } from '@/utils/gameBoardFunctions';
import Definitions from '@/components/Definitions';

import dayjs from 'dayjs'

import DateTimePicker from 'react-native-ui-datepicker';
import LeaderboardEntry from '@/components/LeaderboardEntry';

import MyAppText from '@/components/MyAppText';

export default function LeaderBoard() {
    const [leaderboard, setLeaderboard] = useState<any>(null);
    const [validWords, setValidWords] = useState<{ word: string, definition: string }[]>([]);

    const date = new Date();
    const sqlDate = date.toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(sqlDate);
    const [openDatePicker, setOpenDatePicker] = useState(false)

    useEffect(() => {
        Supabase.getLeaderboard(selectedDate).then((data) => {
            setLeaderboard(data);
        });
        currentRank = 1;
        previousRank = 1;
        currentSlides = 0;
        currentTime = 0;
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
            <TouchableOpacity 
                onPress={() => setOpenDatePicker(true)}
                style={{padding: 10, borderWidth: 1, borderColor: COLOURS.green, borderRadius: 10, marginBottom: 10, backgroundColor: 'white'}}
            >
                <MyAppText>{selectedDate}</MyAppText>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={openDatePicker}
                onRequestClose={() => {
                    setOpenDatePicker(false);
                }}
                transparent={true}
            >
                <Pressable
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        padding: 20,
                    }}
                    onPress={() => setOpenDatePicker(false)}
                >
                    <TouchableWithoutFeedback>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLOURS.green,
                            }}>
                            <DateTimePicker
                                mode="single"
                                date={selectedDate}
                                onChange={(params) => {
                                    if (!params.date) return;
                                    let date = new Date(params.date as Date);
                                    date.setDate(date.getDate() + 1);
                                    const dateString = date.toISOString().split('T')[0];
                                    setSelectedDate(dateString);
                                    setTimeout(() => {
                                        setOpenDatePicker(false);
                                    }, 100);
                                    
                                }
                                }
                            />
                        </View>
                    </TouchableWithoutFeedback>

                </Pressable>

            </Modal>
            <View
                style={{
                    width: "100%",
                    height: "70%",
                    backgroundColor: "white",
                    alignItems: 'center',
                }}
            >
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
                    <View style={{ width: "100%"}}>
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
                            style={{ backgroundColor: "white", height: "80%" }}
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "black",
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
    },
});