import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COLOURS } from '@/constants/colours';
import { useEffect, useState } from 'react';
import { Supabase } from '@/utils/supabaseFunctions';

import { formatSeconds } from '@/utils/helperFunctions';

import LeaderboardEntry from '@/components/LeaderboardEntry';

import MyAppText from '@/components/MyAppText';

export default function LeaderBoard() {
    const [leaderboard, setLeaderboard] = useState<any>(null);
    useEffect(() => {
        const date = new Date();
        const sqlDate = date.toISOString().split('T')[0];
        Supabase.getLeaderboard(sqlDate).then((data) => {
            console.log(data);
            setLeaderboard(data);
        });
    }, []);

    let currentRank = 1;
    let rankCounter = 0;
    let previousRank = 1;
    let currentSlides = 0;
    let currentTime = 0;

    function returnRank(slides : number, time_seconds : number) : string {
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
            {leaderboard ?
                (leaderboard.length != 0 ?
                    <View>
                    <View style={styles.headerContainer}>
                        <MyAppText style={{fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Rank</MyAppText>
                        <MyAppText style={{fontWeight: 'bold', flex: 2, textAlign: 'center'}}>Name</MyAppText>
                        <MyAppText style={{fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Slides</MyAppText>
                        <MyAppText style={{fontWeight: 'bold', flex: 1, textAlign: 'center'}}>Time</MyAppText>
                        <View style={{flex: 1}} />
                    </View>
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
                            />
                        )}
                        style={{backgroundColor: "white", height: "80%"}}
                    />
                    </View>
                    :
                    <MyAppText>No entries yet</MyAppText>
                ) : <MyAppText>Loading...</MyAppText>
            }
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