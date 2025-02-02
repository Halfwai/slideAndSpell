import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBackward, faForward, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function BottomButtons() {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} >
                <FontAwesomeIcon icon={faRotateLeft} size={30} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <FontAwesomeIcon icon={faForward} size={30} color={'white'} />
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