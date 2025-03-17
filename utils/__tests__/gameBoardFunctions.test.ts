import { Direction } from "@/constants/enums";
import * as gameBoardFunctions from "@/utils/gameBoardFunctions";
import * as definitions from "@/assets/wordList/combined.json";

jest.mock("@/assets/wordList/combined.json", () => ({
    testword: "A sample definition",
    validword: "Another definition",
}));

describe("Game Utility Functions", () => {
    test("findZero should return the correct zero position", () => {
        const gameBoard = [
            ["A", "B", "C"],
            ["D", "0", "F"],
            ["G", "H", "I"]
        ];
        expect(gameBoardFunctions.findZero(gameBoard)).toEqual({ x: 1, y: 1 });
    });

    test("checkSlidable should return correct direction", () => {
        const gameBoard = [
            ["A", "B", "C"],
            ["D", "0", "F"],
            ["G", "H", "I"]
        ];
        expect(gameBoardFunctions.checkSlidable(1, 2, gameBoard)).toBe(Direction.UP);
        expect(gameBoardFunctions.checkSlidable(1, 0, gameBoard)).toBe(Direction.DOWN);
        expect(gameBoardFunctions.checkSlidable(2, 1, gameBoard)).toBe(Direction.LEFT);
        expect(gameBoardFunctions.checkSlidable(0, 1, gameBoard)).toBe(Direction.RIGHT);
        expect(gameBoardFunctions.checkSlidable(0, 0, gameBoard)).toBe(Direction.FALSE);
    });

    test("switchZero should swap zero position with given tile", () => {
        const gameBoard = [
            ["A", "B", "C"],
            ["D", "0", "F"],
            ["G", "H", "I"]
        ];
        expect(gameBoardFunctions.switchZero(1, 2, gameBoard)).toEqual([
            ["A", "B", "C"],
            ["D", "F", "0"],
            ["G", "H", "I"]
        ]);
    });

    test("checkWord should return correct definition", () => {
        expect(gameBoardFunctions.checkWord("testword")).toBe("A sample definition");
        expect(gameBoardFunctions.checkWord("invalidword")).toBeUndefined();
    });

    test("checkWords should validate correct words", () => {
        const gameBoard = [["t", "e", "s", "t"], ["v", "a", "l", "i"], ["d", "w", "o", "r"], ["d", "x", "y", "z"]];
        jest.spyOn(gameBoardFunctions, "checkWord").mockImplementation((word) => definitions[word]);
        const result = gameBoardFunctions.checkWords(gameBoard);
        expect(result.correctWords).toEqual([{ word: "test", definition: "A sample definition" }]);
        expect(result.newValidArray).toEqual([true, false, false, false]);
    });

    test("getFinalWord should return word with extra letter", () => {
        const gameBoard = [["A", "B", "C"], ["D", "0", "F"], ["G", "H", "I"]];
        const result = gameBoardFunctions.getFinalWord(gameBoard, "E");
        expect(result.word).toBe("DEF");
        expect(result.zeroY).toBe(1);
    });
});