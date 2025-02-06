import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBackward, faForward, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

import { ArrowReturnLeft } from 'react-bootstrap-icons';
import { ArrowRight } from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';

export default function InGameBottomMenu() {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} >
            <Icon.ArrowRight />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <FontAwesomeIcon icon={faBackward} size={30} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <FontAwesomeIcon icon={faVolumeHigh} size={30} color={'white'} />
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
    }
})