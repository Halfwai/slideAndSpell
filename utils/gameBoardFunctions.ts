import { Direction } from "@/constants/enums";
import { wordList } from "@/assets/wordList/words";
import * as definitions from "@/assets/wordList/combined.json";

type Definitions = {
    [key: string]: string;
};

export const generateGameBoard = (size: number): { extraLetter: string, gameBoard: string[][], hints: string[][]} => {
    const words = returnValidWords(size);
    let gameBoard = [];
    for (let i = 0; i < size; i++) {
        gameBoard.push(words[i].split(''));
    }
    const solution = JSON.parse(JSON.stringify(gameBoard));
    const randomIndexX = Math.floor(Math.random() * wordList.length);
    const randomIndexY = Math.floor(Math.random() * wordList.length);
    let extraLetter = gameBoard[randomIndexY][randomIndexX];
    gameBoard[randomIndexX][randomIndexY] = "0";
    gameBoard = convolveBoard(gameBoard);
    return {extraLetter, gameBoard, hints: solution};
}

// checkSlidable function checks if a tile can be moved in a certain direction and returns a Direction enum
export const checkSlidable = (x: number, y: number, gameBoard: string[][]) : Direction => {
    const size = gameBoard.length;
    if (x > 0 && gameBoard[x - 1][y] === '0') return Direction.UP;
    if (x < size - 1 && gameBoard[x + 1][y] === '0') return Direction.DOWN;
    if (y > 0 && gameBoard[x][y - 1] === '0') return Direction.LEFT;
    if (y < size - 1 && gameBoard[x][y + 1] === '0') return Direction.RIGHT;
    return Direction.FALSE;
}

export const switchZero = (x: number, y: number, gameBoard: string[][]) : string[][] => {
    const zero = findZero(gameBoard);
    if (zero === undefined) return gameBoard;
    const tempBoard = [...gameBoard];
    const temp = tempBoard[x][y];
    tempBoard[x][y] = "0";
    tempBoard[zero.y][zero.x] = temp;
    return tempBoard;
}

// findZero function finds the position of the zero tile
export const findZero = (gameBoard : string[][]) : {x: number, y: number} => {
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

export const returnZeroPos = (gameBoard: string[][], spaceSize: number) => {
    const currentZeroPos = findZero(gameBoard);
    return { x: currentZeroPos.x * spaceSize, y: currentZeroPos.y * spaceSize };
}

export const checkWords = (gameBoard: string[][]): {correctWords: {word: string, definition: string}[], newValidArray: boolean[]} => {
    const size = gameBoard.length;
    let newValidArray = [];
    let correctWords = [];
    for (let i = 0; i < size; i++) {
        const word = gameBoard[i].join('');
        const definition = checkWord(word);
    
        if (definition && word.length === size) {
            // console.log(definition);
            correctWords.push({word: word, definition: definition});
            newValidArray[i] = true;
            
        } else {
            newValidArray[i] = false;
        }        }
    return {correctWords, newValidArray};
}
    
export const checkWord = (word: string): string => {
    return (definitions as Definitions)[word];
}

export const getFinalWord = (gameBoard: string[][], extraLetter : string): {word: string, zeroY: number} => {
    const zeroPos = findZero(gameBoard);
    const wordArray = [...gameBoard[zeroPos.y]];
    for(let i = 0; i < wordArray.length; i++) {
        if(wordArray[i] === '0') {
            wordArray[i] = extraLetter;
            break;
        }
    }
    let word = wordArray.join('');
    return {word, zeroY: zeroPos.y};
}

export const removeZero = (gameBoard: string[][], extraLetter: string): string[][] => {
    const zeroPos = findZero(gameBoard);
    const tempBoard = [...gameBoard];
    tempBoard[zeroPos.y][zeroPos.x] = extraLetter;
    return tempBoard;
}

const convolveBoard = (gameBoard: string[][]): string[][] => {
    const size = gameBoard.length;
    for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        while(checkSlidable(x, y, gameBoard) === Direction.FALSE){
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);
        }
        const switchedBoard = switchZero(x, y, gameBoard);
        if (switchedBoard) {
            gameBoard = switchedBoard;
        }
    }
    return gameBoard;
}

export const returnValidWords = (wordLength : number) => {
    const keys : string[] = Object.keys(definitions) as string[];
    let validWords : string[] = [];
    for (let i = 0; i < wordLength; i++) {
        let randomIndex = Math.floor(Math.random() * keys.length);
        while (keys[randomIndex].length !== wordLength) {
            randomIndex = Math.floor(Math.random() * keys.length);
        }
        validWords.push(keys[randomIndex]);
    }
    return validWords;
}