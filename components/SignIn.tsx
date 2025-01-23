import { Animated, TouchableOpacity, StyleSheet, TextInput, Alert, View } from "react-native"
import MyAppText from "@/components/MyAppText"
import { useEffect, useRef, useState } from "react"

import { supabase } from '@/lib/supabase'

import AuthButton from "@/components/AuthButton"

import { COLOURS } from '@/constants/colours'

interface SignInProps {
    setMenu: Function,
}

export default function SignIn(props: SignInProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function signInWithEmail() {
        if(email === ''){ 
            Alert.alert('Please enter an email'); 
            return; 
        };
        if(password === ''){
            Alert.alert('Please enter a password');
            return;
        }
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

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

            <AuthButton text="Sign In" onPress={signInWithEmail} style={{ backgroundColor: COLOURS.green }} /> 
            <AuthButton text="Back" onPress={() => { props.setMenu("welcome") }} style={{ backgroundColor: "white", borderColor: COLOURS.green }} /> 
        </View>
    )
}

const styles =  StyleSheet.create({
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