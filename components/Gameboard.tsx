// Import necessary libraries
import { StyleSheet, Dimensions, Animated } from "react-native";
import Tile from "./Tile";
import React, { useState, useEffect, useRef } from "react";
import EmptySquare from "@/components/EmptySquare";
import { GameBoardFunctions } from "@/utils/gameBoardFunctions";
import ExtraTile from "@/components/ExtraTile";
import ScoreComponent from "@/components/ScoreComponent";
import Definitions from "@/components/Definitions";

// Define the Gameboard component
export default function GameBoard(props: { gameBoard: string[][], extraLetter: string }) {
    const size = props.gameBoard.length;
    const spaceSize = (300 - 2) / size;
    const tileSize = spaceSize - 4;

    const [squareColour, setSquareColour] = useState(0);

    const boardPosition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    const [slides, setSlides] = useState(0);
    const [incrementTime, setIncrementTime] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [validWords, setValidWords] = useState<{ word: string, definition: string }[]>([]);
    const [activateSlideUp, setActivateSlideUp] = useState(false);

    useEffect(() => {
        Animated.timing(boardPosition, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start(({ finished }: { finished: boolean }) => {
            if (finished) setIncrementTime(true);
        });
    }, []);

    function slideBoardOut() {
        Animated.timing(boardPosition, {
            toValue: Dimensions.get('window').height,
            duration: 500,
            useNativeDriver: true
        }).start(({ finished }: { finished: boolean }) => {
            if (finished) setActivateSlideUp(true);
        });
    }

    const [board, setBoard] = useState(props.gameBoard);
    const [validArray, setValidArray] = useState(Array(size).fill(false));

    const [zeroPos, setZeroPos] = useState(GameBoardFunctions.returnZeroPos(board, spaceSize));
    const [canInsertLetter, setCanInsertLetter] = useState(false);
    const [gameOver, setGameOver] = useState(false);



    useEffect(() => {
        setZeroPos(GameBoardFunctions.returnZeroPos(board, spaceSize));
        const { correctWords, newValidArray } = GameBoardFunctions.checkWords(board);
        if (validArray !== newValidArray) {
            setValidArray(newValidArray);
        }
        if (correctWords.length === size - 1 && !gameOver) {
            const word = GameBoardFunctions.getFinalWord(board, props.extraLetter);
            const definition = GameBoardFunctions.checkWord(word);
            if (definition) {
                correctWords.push({ word: word, definition: definition });
                setValidWords(correctWords);
                setCanInsertLetter(true);
            } else {
                setCanInsertLetter(false);
            }
        }        
    }, [board]);

    return (
        <>
            <Animated.View style={[styles().mainBoard, { transform: [{ translateY: boardPosition }] }]}>
                {/* Map the board state to Tile components */}
                {board.map((row, i) => (
                    row.map((cell, j) => (
                        <React.Fragment
                            key={`${i}:${j}`}
                        >
                            {GameBoardFunctions.findZero(board).x === j && GameBoardFunctions.findZero(board).y === i ?
                                <EmptySquare
                                    tileSize={tileSize}
                                    position={{ x: j * spaceSize, y: i * spaceSize }}
                                    colour={squareColour}
                                /> :
                                <Tile
                                    value={cell}
                                    position={{ x: j * spaceSize, y: i * spaceSize }}
                                    spaceSize={spaceSize}
                                    tileSize={tileSize}
                                    slidable={GameBoardFunctions.checkSlidable(i, j, board)}
                                    switch={() => {
                                        setSlides((slides) => slides + 1);
                                        return GameBoardFunctions.switchZero(i, j, board);
                                    }}
                                    resetBoard={(newBoard: string[][]) => {
                                        setBoard(newBoard);
                                    }}
                                    valid={validArray[i]}
                                />
                            }
                        </React.Fragment>
                    ))
                ))}
                {!gameOver && <ExtraTile
                    letter={props.extraLetter}
                    tileSize={tileSize}
                    zeroPos={zeroPos}
                    canInsert={canInsertLetter}
                    setEmptySquareColour={(colour: number) => {
                        setSquareColour(colour)
                    }}
                    removeZero={() => {
                        setBoard(GameBoardFunctions.removeZero(board, props.extraLetter));
                        setGameOver(true);
                        setIncrementTime(false);
                        setTimeout(() => {
                            slideBoardOut();
                        }, 1000);
                    }}
                />}
            </Animated.View>
            <ScoreComponent
                incrementTime={incrementTime}
                slides={slides}
                gameOver={gameOver}
                returnTime={(time : number) => {
                    setTotalTime(time);
                }}
                slideUp={activateSlideUp}
            />
            {gameOver && 
                <Definitions 
                    slideIn={activateSlideUp}
                    validWords={validWords}
                />
            }               
        </>
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
        zIndex: 1,
        position: 'absolute',
    }
});