import { Text, View, StyleSheet, Alert } from "react-native";
import GameBoard from "@/components/gameComponents/GameBoard";
import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "@/utils/context";

import { supabase } from '@/lib/supabase'
import { useRouter, RelativePathString } from "expo-router";

import InGameBottomMenu from "@/components/submenuComponents/InGameBottomMenu";


import { GameBoardFunctions } from "@/utils/gameBoardFunctions";
import { Supabase } from "@/utils/supabaseFunctions";

export default function Index() {
    const [gameBoard, setGameBoard] = useState<string[][] | null>(null);
    const [extraLetter, setExtraLetter] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [hints, setHints] = useState<string[][] | null>(null);
    const session = useContext(UserContext)?.session;

    const router = useRouter();

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
            setHints(data[0].hints);
            return;
        }
        const { gameBoard, extraLetter, hints } = GameBoardFunctions.generateGameBoard(4);
        const insertData = Supabase.insertGameBoard(sqlDate, gameBoard, extraLetter, hints);
        if (!insertData) {
            console.error("Error inserting data");
            return
        }
        setGameBoard(gameBoard);
        setExtraLetter(extraLetter);
        setHints(hints);
        return;
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
            {gameBoard && extraLetter && hints &&
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
                        hints={hints}
                    />
                </View>
            }
            <InGameBottomMenu />
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