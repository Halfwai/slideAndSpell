import { Text, View, StyleSheet } from "react-native";
import GameBoard from "@/components/gameComponents/GameBoard";
import React, { useState, useContext } from "react";
import MenuButton from "@/components/buttons/MenuButton";

import { UserContext } from "@/utils/context";

import { supabase } from '@/lib/supabase'


import { GameBoardFunctions } from "@/utils/gameBoardFunctions";
import InGameBottomMenu from "@/components/submenuComponents/InGameBottomMenu";

export default function Index() {
    const [exitMenu, setExitMenu] = useState(false);
    const [gameBoard, setGameBoard] = useState<string[][] | null>(null);
    const [extraLetter, setExtraLetter] = useState<string | null>(null);
    const [levelPicked, setLevelPicked] = useState<number | null>(null);
    const [hints, setHints] = useState<string[][] | null>(null);

    const session = useContext(UserContext)?.session;

    async function updateUserStats(time: number, slides: number) {
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
            {gameBoard && extraLetter && hints ?
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
                        hints={hints}
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
                                    const {extraLetter, gameBoard, hints} = GameBoardFunctions.generateGameBoard(level);
                                    setExtraLetter(extraLetter);
                                    setGameBoard(gameBoard);
                                    setHints(hints);
                                }, 700)
                            )}
                            delay={i * 100}
                            exitMenu={exitMenu}
                        />
                    ))}
                </View>
               
            }
            <InGameBottomMenu />
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