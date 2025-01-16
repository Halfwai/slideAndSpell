// Import necessary libraries
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import Tile from "./Tile";
import { useState, useEffect, useRef } from "react";

// spellcheck dictionary
import axios from 'axios';

import { wordList } from "@/assets/wordList/words";
// import * as definitions from "@/assets/wordList/dictionary_compact";

import { GameBoardFunctions } from "@/utils/gameBoardFunctions";

import ExtraTile from "@/components/ExtraTile";


// Define the Gameboard component
export default function GameBoard(props: {gameBoard: string[][], extraLetter: string}) {
    // const isWordValid = async (word : string) => {
    //     try {
    //         const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    //         console.log(`${word}: ${response.data[0].meanings[0].definitions[0].definition}`);
    //         return true;
    //     //   return response.status === 200; // Word exists if response is successful
    //     } catch (error) {
    //         return false;
    //     }
    // };

    const size = props.gameBoard.length;
    const spaceSize = (300 - 2) / size;
    const tileSize = spaceSize - 4;

    const boardPosition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    useEffect(() => {
        Animated.timing(boardPosition, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, []);
  
    const [board, setBoard] = useState(props.gameBoard);
    const [validArray, setValidArray] = useState(Array(size).fill(false));
    
    const [zeroPos, setZeroPos] = useState(returnZeroPos());

    function returnZeroPos() {
        const currentZeroPos = GameBoardFunctions.findZero(board);
        return {x: currentZeroPos.x * spaceSize, y: currentZeroPos.y * spaceSize};
    }

    useEffect(() => {
        setZeroPos(returnZeroPos());
        const newValidArray = GameBoardFunctions.checkWords(board);
        if(validArray !== newValidArray) {
            setValidArray(newValidArray);
        }
    }, [board]);


    return (
        <Animated.View style={[styles().mainBoard, {transform: [{translateY: boardPosition}]}]}>
            {/* Map the board state to Tile components */}
            
            {board.map((row, i) => (
                row.map((cell, j) => (
                    <Tile 
                        key={i + j} 
                        value={cell} 
                        position={{x: j * spaceSize, y: i * spaceSize}}
                        spaceSize = {spaceSize}
                        tileSize = {tileSize} 
                        slidable={GameBoardFunctions.checkSlidable(i, j, board)} 
                        switch={() => {
                            return GameBoardFunctions.switchZero(i, j, board);
                        }}
                        resetBoard={(newBoard: string[][]) => {
                            setBoard(newBoard);
                        }}
                        valid = {validArray[i]}
                    />
                ))
            ))}
            <ExtraTile letter={props.extraLetter} tileSize={tileSize} zeroPos={zeroPos} />
        </Animated.View>
    );
}

// Define the styles
const styles = () => StyleSheet.create({
    mainBoard: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    }
});