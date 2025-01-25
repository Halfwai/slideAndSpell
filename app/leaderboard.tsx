import{ View, Text, StyleSheet, FlatList } from 'react-native';
import { COLOURS } from '@/constants/colours';
import { useEffect, useState } from 'react';
import { Supabase } from '@/utils/supabaseFunctions';

import { formatSeconds } from '@/utils/helperFunctions';

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


    return (
        <View style={styles.container}>
            <Text>Leaderboard</Text>
            {leaderboard && 
                <FlatList 
                    data={leaderboard}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 10, backgroundColor: COLOURS.red}}>
                            <Text>{index + 1}</Text>
                            <Text>{item.display_name}</Text>
                            <Text>{item.slides}</Text>
                            <Text>{formatSeconds(item.time_seconds)}s</Text>
                        </View>
                    )}
                />
                
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOURS.blue
    }
});