import { Direction } from "@/constants/enums";
import * as gameBoardFunctions from "@/utils/gameBoardFunctions";
import * as definitions from "@/assets/wordList/combined.json";

jest.mock("@/assets/wordList/combined.json", () => ({
    "test": "Test definition",
}));

type Definitions = {
    [key: string]: string;
};

describe("Game Utility Functions", () => {
    test("findZero should return the correct zero position", () => {
        const gameBoard = [
            ["a", "b", "c"],
            ["d", "0", "f"],
            ["g", "h", "i"]
        ];
        expect(gameBoardFunctions.findZero(gameBoard)).toEqual({ x: 1, y: 1 });
    });

    test("checkSlidable should return correct direction", () => {
        const gameBoard = [
            ["a", "b", "c"],
            ["d", "0", "f"],
            ["g", "h", "i"]
        ];
        expect(gameBoardFunctions.checkSlidable(1, 2, gameBoard)).toBe(Direction.LEFT);
        expect(gameBoardFunctions.checkSlidable(1, 0, gameBoard)).toBe(Direction.RIGHT);
        expect(gameBoardFunctions.checkSlidable(2, 1, gameBoard)).toBe(Direction.UP);
        expect(gameBoardFunctions.checkSlidable(0, 1, gameBoard)).toBe(Direction.DOWN);
        expect(gameBoardFunctions.checkSlidable(0, 0, gameBoard)).toBe(Direction.FALSE);
    });

    test("switchZero should swap zero position with given tile", () => {
        const gameBoard = [
            ["a", "b", "c"],
            ["d", "0", "f"],
            ["g", "h", "i"]
        ];
        expect(gameBoardFunctions.switchZero(0, 0, gameBoard)).toEqual([
            ["0", "b", "c"],
            ["d", "a", "f"],
            ["g", "h", "i"]
        ]);
    });

    test("checkWord should return correct definition", () => {
        expect(gameBoardFunctions.checkWord("test")).toBe("Test definition");
        expect(gameBoardFunctions.checkWord("abcd")).toBeUndefined();
    });

    test("checkWords should validate correct words", () => {
        const checkGameBoard = [
            ["t", "e", "s", "t"], 
            ["a", "b", "c", "d"], 
            ["a", "b", "c", "d"], 
            ["a", "b", "c", "d"]
        ];
        jest.spyOn(gameBoardFunctions, "checkWord").mockImplementation((word) => (definitions as Definitions)[word]);
        const result = gameBoardFunctions.checkWords(checkGameBoard);
        expect(result.correctWords).toEqual([ { word: 'test', definition: 'Test definition' } ]);
        expect(result.newValidArray).toEqual([true, false, false, false]);
    });

    test("getFinalWord should return word with extra letter", () => {
        const gameBoard = [
            ["a", "b", "c"],
            ["d", "0", "f"],
            ["g", "h", "i"]
        ];
        const result = gameBoardFunctions.getFinalWord(gameBoard, "e");
        expect(result.word).toBe("def");
        expect(result.zeroY).toBe(1);
    });
});