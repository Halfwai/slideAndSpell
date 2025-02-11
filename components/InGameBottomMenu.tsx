import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useRouter} from 'expo-router';

import { UserContext } from '@/utils/context';


export default function InGameBottomMenu() {
    const router = useRouter();
    const context = useContext(UserContext);
    if(context === null) {
        return null;
    }
    const { vibrate, sound, setSound, setVibrate } = context;
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                    router.back();
                }}
            >
                <MaterialIcon name="skip-previous" size={30} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} 
                onPress={() => {
                    setVibrate(!vibrate);
                }}
            >
                {vibrate ?                 
                    <MaterialIcon name="vibrate" size={30} color={'white'} /> :
                    <MaterialIcon name="vibrate-off" size={30} color={'white'} />
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} 
                onPress={() => {
                    setSound(!sound);
                }}
            >
                { sound ? 
                    <EntypoIcon name="sound" size={30} color={'white'} /> : 
                    <EntypoIcon name="sound-mute" size={30} color={'white'} 
                />

                }
            </TouchableOpacity>
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
    button: {
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 15,
    },
})