import { View, StyleSheet, TextInput } from 'react-native';
import MyAppText from '@/components/MyAppText';
import { useState, useContext } from 'react';

import { COLOURS } from '@/constants/colours';

import AuthButton from '@/components/AuthButton';

import { SessionContext } from '@/utils/context';

export default function Settings() {
    const session = useContext(SessionContext);
    const user = session?.user?.user_metadata;


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const createUserObject = () => {
        let userObject: { email?: string } = {}
        if(email !== ''){
            userObject.email = email;
        }
        console.log(user);
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
                        createUserObject();
                    }} 
                    style={{ backgroundColor: COLOURS.green }} 
                />
            </View>            
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