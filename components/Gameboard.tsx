// Import necessary libraries
import { View, StyleSheet } from "react-native";
import Tile from "./Tile";
import { useState, useEffect } from "react";

// random words dictionary
import { generate, wordsList } from 'random-words';

// spellcheck dictionary
import axios from 'axios';

// Import the Direction enum
import { Direction } from "@/constants/enums";

// import { wordListOne, wordListTwo } from "@/assets/wordList/words_dictionary";

import { wordList } from "@/assets/wordList/words";
// import * as definitions from "@/assets/wordList/dictionary_compact";


// Define the Gameboard component
export default function Gameboard() {
    const isWordValid = async (word : string) => {
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            console.log(`${word}: ${response.data[0].meanings[0].definitions[0].definition}`);
            return true;
        //   return response.status === 200; // Word exists if response is successful
        } catch (error) {
            return false;
        }
    };

    const size = 3;
    const spaceSize = 300 / size;
    const tileSize = spaceSize - 4;

    // Define function to fetch random words
    function fetchRandomWords() {
        const words = generate({exactly: size, minLength: size, maxLength: size});
        return words;
    }    

    // Define function to generate the board state
    function generateBoard(): { starterBoard: string[][], extraLetter: string } {
        const words = fetchRandomWords();
        const extraLetter = words[size-1][size-1];
        const starterBoard: string[][] = Array(size).fill(null).map(() => Array(size).fill(null));
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                starterBoard[i][j] = words[i][j];
            }
        }
        starterBoard[size-1][size-1] = "0";
        return {starterBoard, extraLetter};
    }

    // define a function to convolve the board state
    function convolveBoard(newBoard: string[][]): string[][] {
        for (let i = 0; i < 100; i++) {
            let x = Math.floor(Math.random() * size);
            let y = Math.floor(Math.random() * size);
            while(checkSlidable(x, y, newBoard) === Direction.FALSE){
                x = Math.floor(Math.random() * size);
                y = Math.floor(Math.random() * size);
            }
            const switchedBoard = switchZero(x, y, newBoard);
            if (switchedBoard) {
                newBoard = switchedBoard;
            }
        }
        return newBoard;
    }

    // checkSlidable function checks if a tile can be moved in a certain direction and returns a Direction enum
    function checkSlidable (x: number, y: number, checkBoard = board) : Direction {
        if (x > 0 && checkBoard[x - 1][y] === '0') return Direction.UP;
        if (x < size - 1 && checkBoard[x + 1][y] === '0') return Direction.DOWN;
        if (y > 0 && checkBoard[x][y - 1] === '0') return Direction.LEFT;
        if (y < size - 1 && checkBoard[x][y + 1] === '0') return Direction.RIGHT;
        return Direction.FALSE;
    }
    
    // switchZero function switches the position of the zero tile with the tile at position (x, y)
    function switchZero (x: number, y: number, newBoard = board) : string[][] | undefined {
        const zero = findZero(newBoard);
        if (zero === undefined) return;
        const tempBoard = [...newBoard];
        const temp = tempBoard[x][y];
        tempBoard[x][y] = "0";
        tempBoard[zero.x][zero.y] = temp;
        return tempBoard;
    }

    // findZero function finds the position of the zero tile
    function findZero (findBoard = board) : {x: number, y: number} | undefined {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (findBoard[i][j] === "0") {
                    return {x: i, y: j};
                }
            }
        }
    }

    // function to check if words are found on the board
    async function checkWords (board: string[][]) {
        let newValidArray = [...validRow];
        for (let i = 0; i < size; i++) {
            let word = board[i].join('');
            if (wordList[word] && word.length === size) {
                console.log(`Is valid: ${word}`);
                // console.log(definitions[word]);
                newValidArray[i] = true;
                
            } else {
                console.log(`Is not valid: ${word}`);
                newValidArray[i] = false;
            }
        }
        setValidRow(newValidArray);
    }

    // Define test board state
    let { starterBoard, extraLetter } = generateBoard();
    starterBoard = convolveBoard(starterBoard);

    const [board, setBoard] = useState(starterBoard);
    const [validRow, setValidRow] = useState(Array(size).fill(false));

    useEffect(() => {
        checkWords(board);
    }, [board]);

    return (
        <View style={styles().mainBoard}>
            {/* Map the board state to Tile components */}
            {board.map((row, i) => (
                row.map((cell, j) => (
                    <Tile 
                        key={i + j} 
                        value={cell} 
                        position={{x: j, y: i}}
                        spaceSize = {spaceSize}
                        tileSize = {tileSize} 
                        slidable={checkSlidable(i, j)} 
                        switch={(x : number, y : number) => {
                            return switchZero(x, y);
                        }}
                        resetBoard={(newBoard: string[][]) => {
                            setBoard(newBoard);
                        }}
                        valid = {validRow[i]}
                    />
                ))
            ))}
        </View>
    );
}

// Define the styles
const styles = () => StyleSheet.create({
    mainBoard: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
    }
});