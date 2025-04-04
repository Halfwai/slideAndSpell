import React, { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize";

// Import COLOURS
import { COLOURS } from '@/constants/colours'

// Import functions
import { signInWithEmail } from '@/utils/supabaseFunctions'

// Import components
import AuthButton from "@/components/buttons/AuthButton"
import MyAppText from "@/components/common/MyAppText"

// Setup props
interface SignInProps {
    setMenu: Function,
}

export default function SignIn(props: SignInProps) {
    // Setup sign in states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    return (
        <View style={styles.container}>
            <MyAppText style={styles.title}>Sign In</MyAppText>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    autoCorrect={false}
                    inputMode="email"
                    placeholderTextColor={"black"}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholderTextColor={"black"}
                />
            </View>
            <AuthButton
                text="Sign In"
                onPress={async() => {
                    setLoading(true);
                    signInWithEmail(email, password);
                    setLoading(false);
                }}
                style={{ backgroundColor: COLOURS.green }}
            />
            <AuthButton 
                text="Back" 
                onPress={() => { 
                    props.setMenu("welcome") }
                } 
                style={{ backgroundColor: "white", borderColor: COLOURS.green }} 
                disabled={loading} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: RFPercentage(4),
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        fontSize: RFPercentage(2.5),
        color: 'black',
    }
})