import { View, StyleSheet, TextInput, Alert, Keyboard, Modal } from 'react-native';
import MyAppText from '@/components/common/MyAppText';
import React, { useState, useContext } from 'react';
import { COLOURS } from '@/constants/colours';
import AuthButton from '@/components/buttons/AuthButton';
import { UserContext } from '@/utils/context';
import { updateUser } from '@/utils/supabaseFunctions';
import InGameBottomMenu from '@/components/submenuComponents/InGameBottomMenu';
import PrivacyPolicy from '@/components/modals/PrivacyPolicy';
import { useRouter, RelativePathString } from 'expo-router';

export default function Settings() {
    const context = useContext(UserContext);
    const user = context?.session?.user?.user_metadata;
    const router = useRouter();
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showBottomButtons, setShowBottomButtons] = useState(true);

    Keyboard.addListener('keyboardDidShow', () => setShowBottomButtons(false));
    Keyboard.addListener('keyboardDidHide', () => setShowBottomButtons(true));

    const createUserObject = () => {
        let userObject: {
            email?: string,
            display_name?: string,
            password?: string,
        } = {}
        if (email.toLowerCase() !== '' && user && email !== user.email.toLowerCase()) {
            userObject.email = email;
        }
        if (displayName !== '' && user && displayName !== user.display_name) {
            userObject.display_name = displayName;
        }
        if (password !== '' && password === passwordConfirm) {
            userObject.password = password;
        }
        if (Object.keys(userObject).length === 0) {
            console.log("No changes made");
        }
        return userObject;
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MyAppText style={styles.title}>Settings</MyAppText>
            </View>
            <View style={styles.inputContainer}>
                <MyAppText>Change Email</MyAppText>
                <TextInput
                    placeholder="New Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoComplete="email"
                    autoCorrect={false}
                    inputMode="email"
                />
                <MyAppText>Change Display Name</MyAppText>
                <TextInput
                    placeholder="New Display Name"
                    style={styles.input}
                    value={displayName}
                    onChangeText={setDisplayName}
                    autoComplete="email"
                    autoCorrect={false}
                    inputMode="email"
                />
                <MyAppText>Change Password</MyAppText>
                <TextInput
                    placeholder="New Password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    autoComplete="email"
                    autoCorrect={false}
                    inputMode="email"
                />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    autoComplete="email"
                    autoCorrect={false}
                    inputMode="email"
                />
                <AuthButton
                    text="Save Changes"
                    onPress={() => {
                        const newUserData = createUserObject();
                        if (Object.keys(newUserData).length === 0) {
                            Alert.alert("No changes made");
                            return;
                        }
                        updateUser(newUserData);
                    }}
                    style={{ backgroundColor: COLOURS.green }}
                />
                <AuthButton
                    text="Play Tutorial"
                    onPress={() => {
                        router.push('/tutorialScreen' as RelativePathString);
                    }}
                    style={{ backgroundColor: COLOURS.grey }}
                />
                <AuthButton
                    text="Privacy Policy"
                    onPress={() => {
                        setShowPrivacyPolicy(true);
                    }}
                    style={{ backgroundColor: COLOURS.grey }}
                />
            </View>
            {showBottomButtons &&
                <InGameBottomMenu />
            }
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.blue,
    },
    titleContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        height: "10%",
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "black",
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        flex: 8,
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