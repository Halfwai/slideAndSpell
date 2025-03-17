import { StyleSheet, Dimensions, Animated, View } from "react-native";
import GameBoardTile from "./GameBoardTile";
import React, { useState, useEffect, useRef } from "react";
import EmptySquare from "@/components/gameComponents/EmptySquare";
import { checkSlidable, checkWords, checkWord, findZero, getFinalWord, removeZero, returnZeroPos, switchZero } from "@/utils/gameBoardFunctions";
import ExtraTile from "@/components/gameComponents/ExtraTile";
import ScoreComponent from "@/components/submenuComponents/ScoreComponent";
import Definitions from "@/components/submenuComponents/Definitions";
import Hints from "@/components/gameComponents/Hints";

interface GameBoardProps {
    gameBoard: string[][],
    extraLetter: string,
    onGameEnd: Function,
    hints?: string[][],
    returnCompleteWords?: Function
}

// Define the Gameboard component
export default function GameBoard(props: GameBoardProps) {
    const size = props.gameBoard.length;
    const spaceSize = ((Dimensions.get("window").width * 0.85) - 2) / size;
    const tileSize = spaceSize - 4;
    const [squareColour, setSquareColour] = useState(0);
    const boardPosition = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const [slides, setSlides] = useState(0);
    const [incrementTime, setIncrementTime] = useState(false);
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

    const [zeroPos, setZeroPos] = useState(returnZeroPos(board, spaceSize));
    const [canInsertLetter, setCanInsertLetter] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [hints, setHints] = useState<string[][]>([]);
    const [hintsSlideIn, setHintsSlideIn] = useState(false);

    useEffect(() => {
        setZeroPos(returnZeroPos(board, spaceSize));
        const { correctWords, newValidArray } = checkWords(board);
        props.returnCompleteWords && props.returnCompleteWords(correctWords.length);
        if (validArray !== newValidArray) {
            setValidArray(newValidArray);
        }
        if (correctWords.length === size - 1 && !gameOver) {
            const { word, zeroY } = getFinalWord(board, props.extraLetter);
            const definition = checkWord(word);
            if (definition) {
                correctWords.splice(zeroY, 0, { word: word, definition: definition });
                setValidWords(correctWords);
                setCanInsertLetter(true);
            } else {
                setCanInsertLetter(false);
            }
        }
        if(props.hints && hints.length < props.hints.length && slides % 10 === 0 && slides !== 0) {
            setHints((hints) => {
                const newHints = [...hints];
                if (props.hints) {
                    newHints.push(props.hints[hints.length]);
                }
                return newHints;
            });
            setHintsSlideIn(true);
        }
    }, [board]);

    return (
        <>
            <Animated.View style={[styles().mainBoard, { transform: [{ translateY: boardPosition }] }]}>
                <Hints
                    startSlideIn={hintsSlideIn}
                    hints={hints}
                    tileSize={tileSize}
                    spaceSize={spaceSize}
                />
                {/* Map the board state to Tile components */}
                {board.map((row, i) => (
                    row.map((cell, j) => (
                        <React.Fragment
                            key={`${i}:${j}`}
                        >
                            {findZero(board).x === j && findZero(board).y === i ?
                                <EmptySquare
                                    tileSize={tileSize}
                                    position={{ x: j * spaceSize, y: i * spaceSize }}
                                    colour={squareColour}
                                /> :
                                <GameBoardTile
                                    value={cell}
                                    position={{ x: j * spaceSize, y: i * spaceSize }}
                                    spaceSize={spaceSize}
                                    tileSize={tileSize}
                                    slidable={checkSlidable(i, j, board)}
                                    switch={() => {
                                        setSlides((slides) => slides + 1);
                                        return switchZero(i, j, board);
                                    }}
                                    resetBoard={(newBoard: string[][]) => {
                                        setBoard(newBoard);
                                    }}
                                    valid={validArray[i]}
                                    disabled={props.hints === undefined && j < size - 1}
                                />
                            }
                        </React.Fragment>
                    ))
                ))}

            </Animated.View>
            {!gameOver && props.extraLetter && <ExtraTile
                letter={props.extraLetter}
                tileSize={tileSize}
                spaceSize={spaceSize}
                boardSize={size}
                zeroPos={zeroPos}
                canInsert={canInsertLetter}
                setEmptySquareColour={(colour: number) => {
                    setSquareColour(colour)
                }}
                removeZero={() => {
                    setBoard(removeZero(board, props.extraLetter));
                    setGameOver(true);
                    setIncrementTime(false);
                    setTimeout(() => {
                        slideBoardOut();
                    }, 1000);
                }}
            />}
            <ScoreComponent
                incrementTime={incrementTime}
                slides={slides}
                gameOver={gameOver}
                returnTime={(time: number) => {
                    props.onGameEnd(time, slides, board);
                }}
                slideUp={activateSlideUp}
            />
            {gameOver && validWords.length > 0 &&
                <View style={{ alignItems: 'center', justifyContent: 'center', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height * 0.6 }}>
                    <Definitions
                        slideIn={activateSlideUp}
                        validWords={validWords}
                    />
                </View>
            }
        </>
    );
}

// Define the styles
const styles = () => StyleSheet.create({
    mainBoard: {
        width: (Dimensions.get("screen").width * 0.85),
        height: (Dimensions.get("screen").width * 0.85),
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        zIndex: 1,
        position: 'absolute',
    }
});