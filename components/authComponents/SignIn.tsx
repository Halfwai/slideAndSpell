import React from "react"
import { StyleSheet, TextInput, View } from "react-native"
import MyAppText from "@/components/common/MyAppText"
import { useState } from "react"
import { signInWithEmail } from '@/utils/supabaseFunctions'
import AuthButton from "@/components/buttons/AuthButton"
import { COLOURS } from '@/constants/colours'

interface SignInProps {
    setMenu: Function,
}

export default function SignIn(props: SignInProps) {
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
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>

            <AuthButton
                text="Sign In"
                onPress={() => {
                    signInWithEmail(email, password, setLoading)
                }}
                style={{ backgroundColor: COLOURS.green }}
            />
            <AuthButton text="Back" onPress={() => { props.setMenu("welcome") }} style={{ backgroundColor: "white", borderColor: COLOURS.green }} disabled={loading} />
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
        fontSize: 30,
    },
    input: {
        width: '90%',
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        fontSize: 20,
        height: 50,
    }
})