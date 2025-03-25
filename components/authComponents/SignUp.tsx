import React, { useState } from "react"
import { TouchableOpacity, StyleSheet, View, TextInput, Modal } from "react-native"
import { RFPercentage } from "react-native-responsive-fontsize"

// Import COLOURS
import { COLOURS } from '@/constants/colours'

// Import functions
import { signUpWithEmail } from '@/utils/supabaseFunctions'

// Import components
import PrivacyPolicy from "@/components/modals/PrivacyPolicy"
import MyAppText from "@/components/common/MyAppText"
import AuthButton from "@/components/buttons/AuthButton"

// Setup props
interface SignUpProps {
    setMenu: Function,
}

export default function SignUp(props: SignUpProps) {
    // Setup sign up states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [loading, setLoading] = useState(false)

    // State to show privacy policy
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)

    return (
        <View style={styles.container}>
            <MyAppText style={styles.title}>Sign Up</MyAppText>
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
                    placeholder="Display Name"
                    style={styles.input}
                    value={displayName}
                    onChangeText={setDisplayName}
                    autoCorrect={false}
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
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    autoCorrect={false}
                    secureTextEntry={true}
                    placeholderTextColor={"black"}
                />
            </View>
            <TouchableOpacity
                style={styles.privacyPolicy}
                onPress={() => {
                    setShowPrivacyPolicy(true)
                }
                }>
                <MyAppText style={styles.text}>
                    By Signing up you agree to our <MyAppText
                        style={styles.privacyPolicyText}
                    >Privacy Policy</MyAppText>
                </MyAppText>
            </TouchableOpacity>
            <AuthButton
                text="Sign Up"
                onPress={async() => {
                    setLoading(true);
                    await signUpWithEmail(email, password, passwordConfirm, displayName);
                    setLoading(false);
                }}
                style={{ backgroundColor: COLOURS.green }}
                disabled={loading}
            />
            <AuthButton
                text="Back"
                onPress={() => {
                    props.setMenu("welcome")
                }}
                style={{ backgroundColor: "white", borderColor: COLOURS.green }} 
                disabled={loading}
            />                
            <Modal
                visible={showPrivacyPolicy}
                animationType="slide"
                transparent={true}
            >
                <PrivacyPolicy
                    hidePrivacyPolicy={() => setShowPrivacyPolicy(false)}
                />

            </Modal>
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
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: RFPercentage(4),
    },
    privacyPolicy: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: RFPercentage(2),
    },
    privacyPolicyText: {
        textDecorationLine: 'underline',
    },
    input: {
        width: '90%',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        fontSize: RFPercentage(2.5),
        color: 'black',
    },
})