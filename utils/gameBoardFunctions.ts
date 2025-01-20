import { generate } from 'random-words';
import { Direction } from "@/constants/enums";
import { wordList } from "@/assets/wordList/words";


// https://github.com/nightblade9/simple-english-dictionary
// https://github.com/matthewreagan/WebstersEnglishDictionary

import * as definitions from "@/assets/wordList/simple_dictionary_with_online_definitions.json";
type Definitions = {
    [key: string]: string;
};

export class GameBoardFunctions {
    static generateGameBoard(size: number): { extraLetter: string, gameBoard: string[][] } {
        const words = generate({exactly: size, minLength: size, maxLength: size});
        let gameBoard = [];
        for (let i = 0; i < size; i++) {
            gameBoard.push(words[i].split(''));
        }
        let extraLetter = gameBoard[size - 1][size - 1];
        gameBoard[size - 1][size - 1] = "0";
        gameBoard = GameBoardFunctions.convolveBoard(gameBoard);
        return {extraLetter, gameBoard};
    }

    // checkSlidable function checks if a tile can be moved in a certain direction and returns a Direction enum
    static checkSlidable (x: number, y: number, gameBoard: string[][]) : Direction {
        const size = gameBoard.length;
        if (x > 0 && gameBoard[x - 1][y] === '0') return Direction.UP;
        if (x < size - 1 && gameBoard[x + 1][y] === '0') return Direction.DOWN;
        if (y > 0 && gameBoard[x][y - 1] === '0') return Direction.LEFT;
        if (y < size - 1 && gameBoard[x][y + 1] === '0') return Direction.RIGHT;
        return Direction.FALSE;
    }

    static switchZero (x: number, y: number, gameBoard: string[][]) : string[][] {
        const zero = GameBoardFunctions.findZero(gameBoard);
        if (zero === undefined) return gameBoard;
        const tempBoard = [...gameBoard];
        const temp = tempBoard[x][y];
        tempBoard[x][y] = "0";
        tempBoard[zero.y][zero.x] = temp;
        return tempBoard;
    }

    // findZero function finds the position of the zero tile
    static findZero (gameBoard : string[][]) : {x: number, y: number} {
        const size = gameBoard.length;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (gameBoard[i][j] === "0") {
                    return {x: j, y: i};
                }
            }
        }
        return {x: -1, y: -1};
    }

    static returnZeroPos(gameBoard: string[][], spaceSize: number) {
        const currentZeroPos = GameBoardFunctions.findZero(gameBoard);
        return { x: currentZeroPos.x * spaceSize, y: currentZeroPos.y * spaceSize };
    }

    static checkWords (gameBoard: string[][]): {correctWords: {word: string, definition: string}[], newValidArray: boolean[]} {
        const size = gameBoard.length;
        let newValidArray = [];
        let correctWords = [];
        for (let i = 0; i < size; i++) {
            const word = gameBoard[i].join('');
            const definition = GameBoardFunctions.checkWord(word);
            console.log(word, definition);
            if (definition && word.length === size) {
                // console.log(definition);
                correctWords.push({word: word, definition: definition});
                newValidArray[i] = true;
                
            } else {
                newValidArray[i] = false;
            }        }
        return {correctWords, newValidArray};
    }
        
    static checkWord(word: string): string {
        return (definitions as Definitions)[word];
    }

    static getFinalWord(gameBoard: string[][], extraLetter : string): string {
        const zeroPos = GameBoardFunctions.findZero(gameBoard);
        const wordArray = [...gameBoard[zeroPos.y]];
        for(let i = 0; i < wordArray.length; i++) {
            if(wordArray[i] === '0') {
                wordArray[i] = extraLetter;
                break;
            }
        }
        let word = wordArray.join('');
        return word;
    }

    static removeZero(gameBoard: string[][], extraLetter: string): string[][] {
        const zeroPos = GameBoardFunctions.findZero(gameBoard);
        const tempBoard = [...gameBoard];
        tempBoard[zeroPos.y][zeroPos.x] = extraLetter;
        return tempBoard;
    }

    private static convolveBoard(gameBoard: string[][]): string[][] {
        const size = gameBoard.length;
        for (let i = 0; i < 1; i++) {
            let x = Math.floor(Math.random() * size);
            let y = Math.floor(Math.random() * size);
            while(GameBoardFunctions.checkSlidable(x, y, gameBoard) === Direction.FALSE){
                x = Math.floor(Math.random() * size);
                y = Math.floor(Math.random() * size);
            }
            const switchedBoard = GameBoardFunctions.switchZero(x, y, gameBoard);
            if (switchedBoard) {
                gameBoard = switchedBoard;
            }
        }
        return gameBoard;
    }
}





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
