// Import necessary libraries
import { View, StyleSheet } from "react-native";
import Tile from "./Tile";
import { useState } from "react";

// Import the Direction enum
import { Direction } from "@/constants/enums";


// Define the Gameboard component
export default function Gameboard() {
    // Define test board state

    const [board, setBoard] = useState([
        ["A", "B", "C", "D"],
        ["E", "F", "G", "H"],
        ["I", "J", "K", "L"],
        ["M", "N", "O", 0]
    ]);

    // checkSlidable function checks if a tile can be moved in a certain direction and returns a Direction enum
    function checkSlidable (x: number, y: number) : Direction {
        if (x > 0 && board[x - 1][y] === 0) return Direction.UP;
        if (x < 3 && board[x + 1][y] === 0) return Direction.DOWN;
        if (y > 0 && board[x][y - 1] === 0) return Direction.LEFT;
        if (y < 3 && board[x][y + 1] === 0) return Direction.RIGHT;
        return Direction.FALSE;
    }
    
    // switchZero function switches the position of the zero tile with the tile at position (x, y)
    function switchZero (x: number, y: number) {
        const zero = findZero();
        if (zero === undefined) return;
        const tempBoard = [...board];
        const temp = tempBoard[x][y];
        tempBoard[x][y] = 0;
        tempBoard[zero.x][zero.y] = temp;
        setBoard(tempBoard);
    }

    // findZero function finds the position of the zero tile
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
            {/* Map the board state to Tile components */}
            {board.map((row, i) => (
                row.map((cell, j) => (
                    <Tile 
                        key={i + j} 
                        value={cell} 
                        position={{x: j, y: i}} 
                        slidable={checkSlidable(i, j)} 
                        switch={(x : number, y : number) => {
                            switchZero(x, y);
                        }}
                    />
                ))
            ))}
        </View>
    );
}

// Define the styles
const styles = StyleSheet.create({
    mainBoard: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
    }
});