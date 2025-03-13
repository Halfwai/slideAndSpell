import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useRouter} from 'expo-router';

import { UserContext } from '@/utils/context';

import RoundButton from '@/components/buttons/RoundButton';


export default function InGameBottomMenu() {
    const router = useRouter();
    const context = useContext(UserContext);
    if(context === null) {
        return null;
    }
    const { vibrate, sound, setSound, setVibrate } = context;
    return (
        <View style={styles.buttonContainer}>
            <RoundButton 
                icon="skip-previous" 
                onPress={() => {
                    router.back();
                }}
                iconType="material"
            />
            <RoundButton 
                icon={vibrate ? "vibrate" : "vibrate-off"} 
                onPress={() => {
                    setVibrate(!vibrate);
                }}
                iconType="material"
            />
            <RoundButton 
                icon={sound ? "sound" : "sound-mute"} 
                onPress={() => {
                    setSound(!sound);
                }}
                iconType="entypo"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        width: '100%',
        position: 'absolute',
        bottom: "3%",
    },
})