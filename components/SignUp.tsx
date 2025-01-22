import { Animated, TouchableOpacity, StyleSheet, View, TextInput, Alert } from "react-native"
import MyAppText from "@/components/MyAppText"
import { useEffect, useRef, useState } from "react"

import AuthButton from "@/components/AuthButton"

import { supabase } from '@/lib/supabase'

import { COLOURS } from '@/constants/colours'
interface SignUpProps {
    position: { x: number, y: number },
    setMenu: Function,
}

export default function SignUp(props: SignUpProps) {
    const position = useRef(new Animated.ValueXY({ x: props.position.x, y: props.position.y })).current;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(props.position.x === 0) {
            setTimeout(() => {
                slide()
            }, 300)
            return;
        }
        slide();   
    }, [props.position]);

    function slide(){
        Animated.timing(position, {
            toValue: { x: props.position.x, y: props.position.y },
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    async function signUpWithEmail() {
        if(email === ''){ 
            Alert.alert('Please enter an email'); 
            return; 
        };
        if(password === ''){
            Alert.alert('Please enter a password');
            return;
        }
        if(password !== passwordConfirm){
            Alert.alert('Passwords do not match');
            return;
        }
        if(displayName === ''){
            Alert.alert('Please enter a display name');
            return;
        }
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: 'username'
                }
            }
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <Animated.View style={styles(position).container}>
            <MyAppText style={styles(position).title}>Sign Up</MyAppText> 
            <View style={styles(position).inputContainer}>
                <TextInput
                    placeholder="Email"
                    style={styles(position).input}
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    autoCorrect={false}
                    inputMode="email"
                />
                <TextInput
                    placeholder="Display Name"
                    style={styles(position).input}
                    value={displayName}
                    onChangeText={setDisplayName}
                    autoCorrect={false}
                /> 
                <TextInput
                    placeholder="Password"
                    style={styles(position).input}
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles(position).input}
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>

            <AuthButton text="Sign Up" onPress={signUpWithEmail} style={{ backgroundColor: COLOURS.green }} /> 
            <AuthButton text="Back" onPress={() => { props.setMenu("welcome") }} style={{ backgroundColor: "white", borderColor: COLOURS.green }} />         
        </Animated.View>
    )
}

const styles = (position : Animated.ValueXY) => StyleSheet.create({
    container: {
        position: 'absolute',
        transform: [{ translateX: position.x }, { translateY: position.y }],
        width: '100%',
        alignItems: 'center',
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