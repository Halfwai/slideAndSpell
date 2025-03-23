import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { RFPercentage } from "react-native-responsive-fontsize";

// Import context
import { UserContext } from '@/utils/context';

// Import components
import MyAppText from '@/components/common/MyAppText';

// Setup props
interface AuthButtonProps {
    text: string;
    onPress: Function;
    style?: object;
    disabled?: boolean;
}

export default function AuthButton(props: AuthButtonProps) {
    // Get userContext
    const userContext = useContext(UserContext);
    return (
        <TouchableOpacity
            style={[styles.button, props.style]}
            onPress={async () => {
                if (props.disabled) return;
                // If vibrate settings are enabled vibrate on touch
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
        fontSize: RFPercentage(3),
        color: 'black',
        fontWeight: 'bold',
    },
})