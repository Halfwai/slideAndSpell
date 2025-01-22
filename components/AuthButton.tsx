import { TouchableOpacity, StyleSheet } from 'react-native';
import MyAppText from '@/components/MyAppText';

interface AuthButtonProps {
    text: string;
    onPress: Function;
    style?: object;
}

export default function AuthButton(props: AuthButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={() => props.onPress()}>
            <MyAppText style={styles.buttonText}>{props.text}</MyAppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    button: {
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 1,
        width: '90%',
    }, 
    buttonText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
})