import {Text, View, StyleSheet, Alert } from "react-native";
import { COLOURS } from "@/constants/colours";
import {useContext, useEffect, useState} from "react";

import MyAppText from "@/components/MyAppText";
import { Supabase } from "@/utils/supabaseFunctions";
import { SessionContext } from "@/utils/context";
import { useRouter } from "expo-router";

import StatBox from "@/components/StatBox";
import { formatSeconds } from "@/utils/helperFunctions";


export default function Stats() {
    const session = useContext(SessionContext);
    if (!session || !session.user) {
        Alert.alert('Please log in to view your stats');
        useRouter().push('/');
        return;
    };

    const [stats, setStats] = useState< any >(null);

    useEffect(() => {
        Supabase.getStats(session.user.id).then((data) => {
            setStats(data);
        });
    }, []);
    
    if (!stats) {
        return (
            <View style={styles.container}>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.statBoxContainer} >
                <MyAppText style={styles.heading}>{session.user.user_metadata.display_name}'s Stats</MyAppText>
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="3x3 Games" value={stats.three_completed_games} position={"left"} />
                <StatBox stat="3x3 Lowest Swipes" value={stats.lowest_swipes_three} position={"right"}/>
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="4x4 Games" value={stats.four_completed_games} position={"left"}/>
                <StatBox stat="4x4 Lowest Swipes" value={stats.lowest_swipes_four} position={"right"}/>
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="5x5 Games" value={stats.five_completed_games} position={"left"} />
                <StatBox stat="5x5 Lowest Swipes" value={stats.lowest_swipes_five} position={"right"}/>
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="6x6 Games" value={stats.six_completed_games} position={"left"} />
                <StatBox stat="6x6 Lowest Swipes" value={stats.lowest_swipes_six} position={"right"}/>
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="Total Time Played" value={`${formatSeconds(stats.total_play_time_seconds)}s`}  position={"bottom"}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOURS.blue,
        width: "100%",
    },
    heading: {
        fontSize: 40,
    },
    statBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
});