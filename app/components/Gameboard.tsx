import { Text, View, StyleSheet } from "react-native";
import { Tile } from "./Tile";
import { useState } from "react";

import { Direction } from "../constants/enums";


export const Gameboard = () => {
    const [board, setBoard] = useState([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]
    ]);
    function checkSlidable (x: number, y: number) : Direction {
        if (x > 0 && board[x - 1][y] === 0) return Direction.LEFT;
        if (x < 3 && board[x + 1][y] === 0) return Direction.RIGHT;
        if (y > 0 && board[x][y - 1] === 0) return Direction.DOWN;
        if (y < 3 && board[x][y + 1] === 0) return Direction.UP;
        return Direction.FALSE;
    }

    return (
        <View style={styles.mainBoard}>
            {board.map((row, i) => (
                row.map((cell, j) => (
                    <Tile key={i + j} value={cell} position={{x: i, y: j}} slidable={checkSlidable(i, j)} />
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