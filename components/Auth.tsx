import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'

import { Button, Input } from '@rneui/themed'

import { useFonts } from 'expo-font';

import { COLOURS } from '@/constants/colours'

import Welcome from '@/components/Welcome'
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';

export default function Auth() {


    const [currentMenu, setCurrentMenu] = useState('welcome')
    const [slideIn, setSlideIn] = useState(false);
    const [welcomePos, setWelcomePos] = useState({x: 0, y: 0})
    const [signInPos, setSignInPos] = useState({x: - Dimensions.get('window').width, y: 0})
    const [signUpPos, setSignUpPos] = useState({x: Dimensions.get('window').width * 2, y: 0})

    useEffect(() => {
        if (currentMenu === 'welcome') {
            setWelcomePos({x: 0, y: 0})
        } else {
            setWelcomePos({x: 0, y: -Dimensions.get('window').height})
        }
        if (currentMenu === 'signIn') {
            setSignInPos({x: 0, y: 0})
        } else {
            setSignInPos({x: -Dimensions.get('window').width, y: 0})
        }
        if (currentMenu === 'signUp') {
            setSignUpPos({x: 0, y: 0})
        } else {
            setSignUpPos({x: Dimensions.get('window').width * 2, y: 0})
        }
    }, [currentMenu])

    // async function signInWithEmail() {
    //     setLoading(true)
    //     const { error } = await supabase.auth.signInWithPassword({
    //         email: email,
    //         password: password,
    //     })

    //     if (error) Alert.alert(error.message)
    //     setLoading(false)
    // }

    // async function signUpWithEmail() {
    //     setLoading(true)
    //     const {
    //         data: { session },
    //         error,
    //     } = await supabase.auth.signUp({
    //         email: email,
    //         password: password,
    //         options: {
    //             data: {
    //                 display_name: 'username'
    //             }
    //         }
    //     })

    //     if (error) Alert.alert(error.message)
    //     if (!session) Alert.alert('Please check your inbox for email verification!')
    //     setLoading(false)
    // }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require("@/assets/images/logo.png")}
                    style={{ width: 300, height: 180, zIndex: 1 }}
                    resizeMode="contain"
                />
            </View>

            <View style={{flex: 1, width: '100%'}}>
                <Welcome 
                    position={welcomePos}
                    setMenu={(state : string) => setCurrentMenu(state)}
                    setSlideIn={(state : boolean) => setSlideIn(state)}
                />
                <SignIn 
                    position={signInPos}
                    setMenu={(state : string) => setCurrentMenu(state)}
                />
                <SignUp 
                    position={signUpPos}
                    setMenu={(state : string) => setCurrentMenu(state)}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOURS.blue,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 60,
        zIndex: 1,
        backgroundColor: COLOURS.blue,
    },
})


{/* <View style={[styles.verticallySpaced]}>
<Input
    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
    onChangeText={(text) => setEmail(text)}
    value={email}
    placeholder="email@address.com"
    autoCapitalize={'none'}
/>
</View>
<View style={styles.verticallySpaced}>
<Input
    leftIcon={{ type: 'font-awesome', name: 'lock' }}
    onChangeText={(text) => setPassword(text)}
    value={password}
    secureTextEntry={true}
    placeholder="Password"
    autoCapitalize={'none'}
    style={{backgroundColor: "white"}}
/>
</View>
<View style={[styles.verticallySpaced]}>
<Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
</View>
<View style={styles.verticallySpaced}>
<Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
</View> */}