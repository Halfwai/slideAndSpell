import { supabase } from '@/lib/supabase'
import { GameBoardFunctions } from '@/utils/gameBoardFunctions'
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
        setLoading(false)
    }

    static getGameboard = async() => {
        const date = new Date();
        const sqlDate = date.toISOString().split('T')[0];
        let { data, error } = await supabase
            .from('puzzles')
            .select("*")
            .eq('date', sqlDate)
        if (error || !data) {
            console.error(error)
            return
        }
        if (data.length > 0) {
            return {
                date: sqlDate,
                gameBoard: data[0].game_board,
                extraLetter: data[0].extra_letter,
                hints: data[0].hints
            }
        }
        const { gameBoard, extraLetter, hints } = GameBoardFunctions.generateGameBoard(4);
        const insertData = Supabase.insertGameBoard(sqlDate, gameBoard, extraLetter, hints);
        if (!insertData) {
            console.error("Error inserting data");
            return
        }
        return {
            date: sqlDate,
            gameBoard: gameBoard,
            extraLetter: extraLetter,
            hints: hints
        }
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

    static async insertGameBoard(date: string, gameBoard: string[][], extraLetter: string, hints: string[][]) {
        const { data, error } = await supabase
            .from('puzzles')
            .insert([
                { date: date, game_board: gameBoard, extra_letter: extraLetter, hints: hints },
            ])
        .select()
        if (error) {
            console.error(error)
            return
        }
        return data;
    }
}
