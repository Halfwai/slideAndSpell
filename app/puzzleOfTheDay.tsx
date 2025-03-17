import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter, RelativePathString } from 'expo-router';

// import functions and context
import { getGameboard, updateUserSolution } from "@/utils/supabaseFunctions";
import { UserContext } from "@/utils/context";

// import components
import InGameBottomMenu from "@/components/submenuComponents/InGameBottomMenu";
import GameBoard from "@/components/gameComponents/GameBoard";

export default function Index() {
    // get router
    const router = useRouter();
    // setup game states
    const [gameBoard, setGameBoard] = useState<string[][] | null>(null);
    const [extraLetter, setExtraLetter] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [hints, setHints] = useState<string[][] | null>(null);
    // get session
    const session = useContext(UserContext)?.session;

    // check if user is logged in and redirect to auth if not
    if (!session) {
        Alert.alert("Please log in to play the puzzle of the day");
        router.push("/auth" as RelativePathString);
    }

    // get game board data on load
    useEffect(() => {
        getGameBoardData()
    }, []);

    const getGameBoardData = async () => {
        // get game board data from supabase
        const gameBoardData = await getGameboard();
        if (!gameBoardData) {
            Alert.alert("Error getting gameboard data");
            router.push("/menu" as RelativePathString);
            return;
        };
        // set game board data
        const { date, gameBoard, extraLetter, hints } = gameBoardData;
        setDate(date);
        setGameBoard(gameBoard);
        setExtraLetter(extraLetter);
        setHints(hints);
    }

    return (
        <View style={styles.container}>
            {gameBoard && extraLetter && hints &&
                <View style={styles.gameBoardContainer}>
                    <GameBoard
                        gameBoard={gameBoard}
                        extraLetter={extraLetter}
                        onGameEnd={(time: number, slides: number, gameBoard: string[][]) => {
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#CBE6F7"
    },
    gameBoardContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
});