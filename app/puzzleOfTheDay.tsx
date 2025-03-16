import { View, StyleSheet, Alert } from "react-native";
import GameBoard from "@/components/gameComponents/GameBoard";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "@/utils/context";
import { useRouter, RelativePathString } from 'expo-router';
import InGameBottomMenu from "@/components/submenuComponents/InGameBottomMenu";
import { getGameboard, updateUserSolution} from "@/utils/supabaseFunctions";

export default function Index() {
    const router = useRouter();
    const [gameBoard, setGameBoard] = useState<string[][] | null>(null);
    const [extraLetter, setExtraLetter] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [hints, setHints] = useState<string[][] | null>(null);
    const session = useContext(UserContext)?.session;    

    if(!session) {
        Alert.alert("Please log in to play the puzzle of the day");
        router.push("/login" as RelativePathString);
    }

    useEffect(() => {
        (async() => {
            const gameboardData = await getGameboard();
            if (!gameboardData) {
                Alert.alert("Error getting gameboard data");
                router.push("/menu" as RelativePathString);
                return;
            };
            const { date, gameBoard, extraLetter, hints } = gameboardData;
            setDate(date);
            setGameBoard(gameBoard);
            setExtraLetter(extraLetter);
            setHints(hints);
        })();
    }, []);

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
                            updateUserSolution(time, slides, gameBoard, session, date);
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