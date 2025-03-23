import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router';
import { RFPercentage } from "react-native-responsive-fontsize";

// Import COLOURS
import { COLOURS } from '@/constants/colours'

// Import Components
import MyAppText from '@/components/common/MyAppText'
import AuthButton from '@/components/buttons/AuthButton'

// Setup props
interface WelcomeProps {
    setMenu: Function
}

export default function Welcome(props: WelcomeProps) {
    // get router
    const router = useRouter();
    return (
        <>
            <View style={styles.welcomeContainer}>
                <MyAppText style={styles.title}>Hi</MyAppText>
                <MyAppText style={styles.welcomeText}>Welcome to Slide and Spell, please sign in for stats and leaderboards, or hit endless mode to play without stats or tracking.</MyAppText>
            </View>
            <View style={styles.buttonContainer}>
                <AuthButton text="Sign In" onPress={() => props.setMenu("signIn")} style={{ backgroundColor: COLOURS.green }} />
                <AuthButton text="Sign Up" onPress={() => props.setMenu("signUp")} style={{ backgroundColor: "white", borderColor: COLOURS.green }} />
            </View>
            <View style={styles.endlessContainer}>
                <AuthButton text="Endless Mode" onPress={() => router.push('/endlessGame')} style={{ backgroundColor: "white", borderColor: COLOURS.green }} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    welcomeContainer: {
        padding: 12,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: RFPercentage(4),
        color: 'black',
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: RFPercentage(2.2),
        color: 'black',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
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

    endlessContainer: {
        height: "50%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})