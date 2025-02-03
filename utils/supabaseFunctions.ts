import { supabase } from '@/lib/supabase'
import { Alert } from 'react-native'

export class Supabase {
    static signUpWithEmail = async (email: string, password: string, passwordConfirm: string, displayName: string, setLoading : Function) => {
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
        if (!session) Alert.alert("Sign up error, please try again")
        setLoading(false)
    }

    static getStats = async (userId : string) => {
        let { data, error } = await supabase
            .from('stats')
            .select('*')
            .eq('user_id', userId)
        if (error) {
            console.error(error)
        } else if (data) {
            return data[0];
        }
    };

    static getLeaderboard = async (date: string) => {
        let { data, error } = await supabase
            .rpc('get_leaderboard', {
                input_date: date
            })
        if (error) {
            console.error(error)
            return
        }
        return data;
    };

    static async updateUser(userObject : any) {
        if(Object.keys(userObject).length === 0){
            Alert.alert("No changes made");
        }
        const { data, error } = await supabase.auth.updateUser({
            email: userObject.email,
            password: userObject.password,
            data: { display_name: userObject.display_name }
        })
        if (error) {
            Alert.alert(error.message)
        } else {
            Alert.alert("Changes saved")
        };   
    }
}
