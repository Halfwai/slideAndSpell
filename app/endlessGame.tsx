import { Text, View, StyleSheet } from "react-native";
import GameBoard from "../components/Gameboard";
import React, { useState, useContext } from "react";
import MenuButton from "@/components/MenuButton";

import { SessionContext } from "@/utils/context";

import { supabase } from '@/lib/supabase'


import { GameBoardFunctions } from "@/utils/gameBoardFunctions";

export default function Index() {
    const [exitMenu, setExitMenu] = useState(false);
    const [gameBoard, setGameBoard] = useState<string[][] | null>(null);
    const [extraLetter, setExtraLetter] = useState<string | null>(null);
    const [levelPicked, setLevelPicked] = useState<number | null>(null);

    const session = useContext(SessionContext);

    async function updateUserStats(time: number, slides: number) {
        console.log(levelPicked);
        if (!session) return;
        let { data, error } = await supabase
        .rpc('update_user_stats', {
            input_user_id: session.user.id,
            input_game_type: levelPicked,             
            input_swipes: slides,
            input_time: time
        })
        if (error) console.error(error)
        else console.log(data)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CBE6F7",
                width: "100%",
            }}
        >
            {gameBoard && extraLetter ?
                <View
                    style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <GameBoard 
                        gameBoard={gameBoard} 
                        extraLetter={extraLetter} 
                        onGameEnd={(time : number, slides: number) => {
                            updateUserStats(time, slides);
                        }}
                    />
                </View>
                :
                <View style={styles.container}>
                    {[...Array(4)].map((_, i) => (
                        <MenuButton
                            key={i}
                            text={`${i + 3}x${i + 3}`}
                            onPress={() => (
                                setExitMenu(true),
                                setTimeout(() => {
                                    const level = i + 3;
                                    setLevelPicked(level);
                                    const {extraLetter, gameBoard} = GameBoardFunctions.generateGameBoard(level);
                                    setExtraLetter(extraLetter);
                                    setGameBoard(gameBoard);
                                }, 700)
                            )}
                            delay={i * 100}
                            exitMenu={exitMenu}
                        />
                    ))}
                </View>
               
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
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