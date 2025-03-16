import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'

import { COLOURS } from '@/constants/colours'

import AuthComponentContainer from '@/components/authComponents/AuthComponentContainer'
import Welcome from '@/components/authComponents/Welcome'
import SignIn from '@/components/authComponents/SignIn';
import SignUp from '@/components/authComponents/SignUp';

export default function Auth() {
    const [currentMenu, setCurrentMenu] = useState('welcome')
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

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require("@/assets/images/logo.png")}
                    style={{ width: "90%", height: "100%", zIndex: 1 }}
                    resizeMode="contain"
                />
            </View>

            <View style={{flex: 1, width: '100%'}}>
                <AuthComponentContainer
                    position={welcomePos}
                >
                    <Welcome 
                        setMenu={(state : string) => setCurrentMenu(state)}
                    />
                </AuthComponentContainer>
                <AuthComponentContainer
                    position={signInPos}                
                >
                    <SignIn 
                        setMenu={(state : string) => setCurrentMenu(state)}
                    />
                </AuthComponentContainer>
                <AuthComponentContainer
                    position={signUpPos}
                >
                    <SignUp 
                        setMenu={(state : string) => setCurrentMenu(state)}
                    />
                </AuthComponentContainer>
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
        // paddingTop: 20,
        zIndex: 1,
        backgroundColor: COLOURS.blue,
        height: Dimensions.get('window').height * 0.3
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