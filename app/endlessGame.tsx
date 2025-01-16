import { Text, View, StyleSheet } from "react-native";
import GameBoard from "../components/Gameboard";
import React, { useState } from "react";
import MenuButton from "@/components/MenuButton";


import { GameBoardFunctions } from "@/utils/gameBoardFunctions";

export default function Index() {
    const [exitMenu, setExitMenu] = useState(false);
    const [gameBoard, setGameBoard] = useState<string[][] | null>(null);
    const [extraLetter, setExtraLetter] = useState<string | null>(null);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CBE6F7"
            }}
        >
            {gameBoard && extraLetter ?
                <View
                    style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <GameBoard gameBoard={gameBoard} extraLetter={extraLetter} />
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
                                    const {extraLetter, gameBoard} = GameBoardFunctions.generateGameBoard(i + 3);
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