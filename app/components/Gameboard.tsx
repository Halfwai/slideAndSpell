import { Text, View, StyleSheet } from "react-native";
import { Tile } from "./Tile";
import { useState } from "react";

export const Gameboard = () => {
    const [board, setBoard] = useState([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]
    ]);
    const checkSlidable : boolean = (x: number, y: number) => {
        if (x > 0 && board[x - 1][y] === 0) return true;
        if (x < 3 && board[x + 1][y] === 0) return true;
        if (y > 0 && board[x][y - 1] === 0) return true;
        if (y < 3 && board[x][y + 1] === 0) return true;
        return false;
    }

    return (
        <View style={styles.mainBoard}>
            {board.map((row, i) => (
                row.map((cell, j) => (
                    <Tile key={i + j} value={cell} position={{x: i, y: j}} slidable={() => {
                        return checkSlidable(i, j);
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