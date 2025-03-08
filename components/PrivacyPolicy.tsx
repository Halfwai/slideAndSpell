import { View, ScrollView, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import MyAppText from '@/components/MyAppText';
import AuthButton from '@/components/AuthButton';
import { COLOURS } from '@/constants/colours';


export default function PrivacyPolicy(props: { hidePrivacyPolicy: Function }) {
    return (
        <View style={styles.privacyPolicyOuterContainer}>
            <View style={styles.privacyPolicyContainer}>
                <MyAppText style={styles.title}>Privacy Policy</MyAppText>
                <ScrollView style={styles.scrollView}>
                    
                    <MyAppText
                        style={styles.policyHeader}
                    >
                        Effective Date: 7th March 2025
                    </MyAppText>
                    <MyAppText>                              
                        Slide and Spell respects your privacy. This Privacy Policy explains how we handle your information when you use our word game app Slide and Spell.
                    </MyAppText>
                    <MyAppText                                
                        style={styles.policyHeader}
                    >
                        Information We Collect
                    </MyAppText>
                    <MyAppText>
                        We collect and store your email address solely for authentication purposes. We do not collect, store, or process any other personal information.
                    </MyAppText>
                    <MyAppText
                        style={styles.policyHeader}
                    >
                        How We Use Your Information
                    </MyAppText>
                    <MyAppText>
                        Your email address is used exclusively to authenticate your identity and allow access to the App. We do not share, sell, or use your email address for any other purpose.
                    </MyAppText>
                    <MyAppText
                        style={styles.policyHeader}
                    >
                        Data Security
                    </MyAppText>
                    <MyAppText>
                        We implement appropriate security measures to protect your email address from unauthorized access, disclosure, or misuse.
                    </MyAppText>
                    <MyAppText
                        style={styles.policyHeader}
                    >
                        Third-Party Services
                    </MyAppText>
                    <MyAppText>
                        Our App does not share your email address with third parties or integrate with third-party services for data processing.
                    </MyAppText>
                    <MyAppText
                        style={styles.policyHeader}
                    >
                        Your Rights
                    </MyAppText>
                    <MyAppText>
                        Since we only collect your email address for authentication, you have the right to request its deletion. If you wish to delete your account and associated email address, please contact us at 
                        <TouchableOpacity 
                            style={{height: "100%"}}
                            onPress={() => Linking.openURL('mailto:slideandspell@gmail.com')}
                        >
                                <MyAppText
                                    style={styles.privacyPolicyText}
                                >slideandspell@gmail.com</MyAppText>
                        </TouchableOpacity>                            
                        .
                    </MyAppText>
                    <MyAppText                         
                        style={styles.policyHeader}
                    >
                        Changes to This Policy
                    </MyAppText>
                    <MyAppText>
                        We may update this Privacy Policy from time to time. Any changes will be posted within the App, and continued use of the App after changes are made signifies your acceptance of the updated policy.
                    </MyAppText>
                    <MyAppText
                        style={styles.policyHeader}
                    >
                        Contact Us
                    </MyAppText>
                    <MyAppText>
                        If you have any questions about this Privacy Policy, please contact us at 
                        <TouchableOpacity 
                            style={{height: "100%"}}
                            onPress={() => Linking.openURL('mailto:slideandspell@gmail.com')}
                        >
                                <MyAppText
                                    style={styles.privacyPolicyText}
                                >slideandspell@gmail.com</MyAppText>
                        </TouchableOpacity>
                        .
                    </MyAppText>
                </ScrollView>
                <AuthButton text="Close" onPress={() => props.hidePrivacyPolicy()} style={{ backgroundColor: COLOURS.green }}/>
            </View>     
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
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
        fontSize: 20,
        height: 50,
    },
    privacyPolicyOuterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    privacyPolicyContainer: {
        height: '80%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.blue,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    scrollView: {
        width: '90%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 10,
        margin: 10,
    },
    policyHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})