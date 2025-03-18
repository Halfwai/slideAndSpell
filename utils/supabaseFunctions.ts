import { supabase } from '@/lib/supabase'
import { generateGameBoard } from '@/utils/gameBoardFunctions'
import { Alert } from 'react-native'

// signUpWithEmail signs up a user with email and password
export const signUpWithEmail = async (email: string, password: string, passwordConfirm: string, displayName: string) => {
    if (email === '') {
        Alert.alert('Please enter an email');
        return;
    };
    if (password === '') {
        Alert.alert('Please enter a password');
        return;
    }
    if (password !== passwordConfirm) {
        Alert.alert('Passwords do not match');
        return;
    }
    if (displayName === '') {
        Alert.alert('Please enter a display name');
        return;
    }
    const {
        data: { session },
        error,
    } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                display_name: displayName
            }
        }
    })
    if (error) Alert.alert(error.message)
}

// signInWithEmail signs in a user with email and password
export const signInWithEmail = async (email: string, password: string) => {
    if (email === '') {
        Alert.alert('Please enter an email');
        return;
    };
    if (password === '') {
        Alert.alert('Please enter a password');
        return;
    }
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) Alert.alert(error.message)
}

// getGameboard fetches the gameboard for the current date, or generates a new one if it doesn't exist
export const getGameboard = async () => {
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
    const { gameBoard, extraLetter, hints } = generateGameBoard(4);
    const insertData = insertGameBoard(sqlDate, gameBoard, extraLetter, hints);
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

// getStats fetches the stats for the current user
export const getStats = async (userId: string) => {
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

// getLeaderboard fetches the leaderboard for the date passed in
export const getLeaderboard = async (date: string) => {
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

// updateUserStats updates the user stats with the time and slides passed in
export const updateUserStats = async (time: number, slides: number, session: any, levelPicked: number | null) => {
    if (!session) return;
    let { data, error } = await supabase
        .rpc('update_user_stats', {
            input_user_id: session.user.id,
            input_game_type: levelPicked,
            input_swipes: slides,
            input_time: time
        })
    if (error) console.error(error)
}

// updateUserSolution updates the user's solution to the puzzle of the day
export const updateUserSolution = async (time: number, slides: number, gameBoard: string[][], session: any, date: string | null) => {
    if (!session) return;
    let { data, error } = await supabase
        .from('solutions')
        .insert([{
            user_id: session.user.id,
            puzzle_date: date,
            solution: gameBoard,
            slides: slides,
            time_seconds: time
        }])
        .select();
    if (error) console.error(error)
}

// updateUser updates the user's email, password, and display name
export const updateUser = async (userObject: any) => {
    if (Object.keys(userObject).length === 0) {
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

// insertGameBoard inserts a new game board into the database
export const insertGameBoard = async (date: string, gameBoard: string[][], extraLetter: string, hints: string[][]) => {
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