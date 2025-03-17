import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

// Import COLOURS
import { COLOURS } from "@/constants/colours";

// Import functions and context
import { getStats } from "@/utils/supabaseFunctions";
import { UserContext } from "@/utils/context";
import { formatSeconds } from "@/utils/helperFunctions";

// Import components
import MyAppText from "@/components/common/MyAppText";
import StatBox from "@/components/submenuComponents/StatBox";

export default function Stats() {
    // Get user session from context
    const userContext = useContext(UserContext);
    const session = userContext ? userContext.session : null;
    if (!session || !session.user) {
        Alert.alert('Please log in to view your stats');
        useRouter().push('/');
        return;
    };

    // State to store stats
    const [stats, setStats] = useState<any>(null);

    // Get stats from supabase
    useEffect(() => {
        getStats(session.user.id).then((data) => {
            setStats(data);
        });
    }, []);

    // If stats are not loaded yet, show loading screen
    if (!stats) {
        return (
            <View style={styles.container}>
            </View>
        )
    }

    // Render stats
    return (
        <View style={styles.container}>
            <View style={styles.statBoxContainer} >
                <MyAppText style={styles.heading}>{session.user.user_metadata.display_name}'s Stats</MyAppText>
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="3x3 Games" value={stats.three_completed_games} position={"left"} />
                <StatBox stat="3x3 Lowest Swipes" value={stats.lowest_swipes_three} position={"right"} />
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="4x4 Games" value={stats.four_completed_games} position={"left"} />
                <StatBox stat="4x4 Lowest Swipes" value={stats.lowest_swipes_four} position={"right"} />
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="5x5 Games" value={stats.five_completed_games} position={"left"} />
                <StatBox stat="5x5 Lowest Swipes" value={stats.lowest_swipes_five} position={"right"} />
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="6x6 Games" value={stats.six_completed_games} position={"left"} />
                <StatBox stat="6x6 Lowest Swipes" value={stats.lowest_swipes_six} position={"right"} />
            </View>
            <View style={styles.statBoxContainer} >
                <StatBox stat="Total Time Played" value={`${formatSeconds(stats.total_play_time_seconds)}s`} position={"bottom"} />
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