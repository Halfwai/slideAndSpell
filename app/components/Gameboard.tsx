import { Text, View, StyleSheet } from "react-native";
import Tile from "./Tile";
import { useState, useEffect } from "react";

import { Direction } from "../constants/enums";


export default function Gameboard() {
    const [board, setBoard] = useState([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]
    ]);
    function checkSlidable (x: number, y: number) : Direction {
        if (x > 0 && board[x - 1][y] === 0) return Direction.UP;
        if (x < 3 && board[x + 1][y] === 0) return Direction.DOWN;
        if (y > 0 && board[x][y - 1] === 0) return Direction.LEFT;
        if (y < 3 && board[x][y + 1] === 0) return Direction.RIGHT;
        return Direction.FALSE;
    }
    function switchZero (x: number, y: number) {
        const zero = findZero();
        if (zero === undefined) return;
        const temp = board[x][y];
        board[x][y] = 0;
        board[zero.x][zero.y] = temp;
        setBoard([...board]);
    }

    function findZero () {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    return {x: i, y: j};
                }
            }
        }
    }

    return (
        <View style={styles.mainBoard}>
            {board.map((row, i) => (
                row.map((cell, j) => (
                    <Tile key={i + j} value={cell} position={{x: j, y: i}} slidable={checkSlidable(i, j)} switch={(x : number, y : number) => {
                        switchZero(x, y);
                    }} />
                ))
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    mainBoard: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
    }
});