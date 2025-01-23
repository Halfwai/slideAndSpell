import { Text, View, StyleSheet } from "react-native";
import GameBoard from "../components/Gameboard";
import React, { useState, useContext, useEffect, Alert } from "react";

import { SessionContext } from "@/utils/context";

import { supabase } from '@/lib/supabase'
import { router, RelativePathString } from "expo-router";


import { GameBoardFunctions } from "@/utils/gameBoardFunctions";

export default function Index() {
    const [gameBoard, setGameBoard] = useState<string[][] | null>(null);
    const [extraLetter, setExtraLetter] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);

    const session = useContext(SessionContext);

    if(!session) {
        Alert.alert("Please log in to play the puzzle of the day");
        router.push("/login" as RelativePathString);
    }

    useEffect(() => {
        getGameboard();
    }, []);

    async function getGameboard() {
        const date = new Date();
        const sqlDate = date.toISOString().split('T')[0];
        setDate(sqlDate);
        let { data, error } = await supabase
            .from('puzzles')
            .select("*")
            .eq('date', sqlDate)
        if (error || !data) {
            console.error(error)
            return
        }
        if (data.length > 0) {
            setGameBoard(data[0].game_board);
            setExtraLetter(data[0].extra_letter);
            return;
        }
        const { gameBoard, extraLetter } = GameBoardFunctions.generateGameBoard(4);
        const { data: insertData, error: insertError } = await supabase
            .from('puzzles')
            .insert([
                { date: sqlDate, game_board: gameBoard, extra_letter: extraLetter },
            ])
        .select()
        if (insertError) {
            console.error(insertError)
            return
        }
        if (insertData) {
            console.log(insertData);
            setGameBoard(gameBoard);
            setExtraLetter(extraLetter);
        }
    }

    async function updateUserStats(time: number, slides: number, gameBoard: string[][]) {
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
        else console.log(data)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CBE6F7"
            }}
        >
            {gameBoard && extraLetter &&
                <View
                    style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <GameBoard 
                        gameBoard={gameBoard} 
                        extraLetter={extraLetter} 
                        onGameEnd={(time : number, slides: number, gameBoard: string[][]) => {
                            updateUserStats(time, slides, gameBoard);
                        }}
                    />
                </View>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
});


// text="Puzzle of the Day"
// onPress={() => (
//     gameBoard = GameBoardFunctions.generateGameBoard(4),
//     setExitMenu(true),
//     setTimeout(() => {
//         setLevelPicked(true);
//     }, 700)
// )}
// delay={0}
// exitMenu={exitMenu}