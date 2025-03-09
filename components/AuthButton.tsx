import { TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import MyAppText from '@/components/MyAppText';
import { UserContext } from '@/utils/context';
import * as Haptics from 'expo-haptics';

interface AuthButtonProps {
    text: string;
    onPress: Function;
    style?: object;
}

export default function AuthButton(props: AuthButtonProps) {
    const userContext = useContext(UserContext);
    return (
        <TouchableOpacity 
            style={[styles.button, props.style]} 
            onPress={async () => {
                if (userContext && userContext.vibrate) {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                props.onPress()
            }}
            testID='authButton'
        >
            <MyAppText style={styles.buttonText}>{props.text}</MyAppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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