import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BottomButtons() {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} >
                <MaterialIcon name="skip-previous" size={30} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <MaterialIcon name="vibrate" size={30} color={'white'} />
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
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 10,
    }
})