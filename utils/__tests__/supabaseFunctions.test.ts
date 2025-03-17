import * as supabaseFunctions from '@/utils/supabaseFunctions';
import { jest } from '@jest/globals';
import { Alert } from 'react-native';

jest.mock('@/utils/supabaseFunctions');
const mockSupabase = jest.mocked(supabaseFunctions, { shallow: true });

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Supabase Functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('signUpWithEmail should call supabase function', async () => {
        mockSupabase.signUpWithEmail.mockResolvedValue(undefined);
        await supabaseFunctions.signUpWithEmail('test@example.com', 'password', 'password', 'TestUser');

        expect(mockSupabase.signUpWithEmail).toHaveBeenCalledWith(
            'test@example.com', 'password', 'password', 'TestUser'
        );
    });

    test('signInWithEmail should call supabase function', async () => {
        mockSupabase.signInWithEmail.mockResolvedValue(undefined);

        await supabaseFunctions.signInWithEmail('test@example.com', 'password');

        expect(mockSupabase.signInWithEmail).toHaveBeenCalledWith('test@example.com', 'password');
    });

    test('getGameboard should return gameboard data', async () => {
        const mockData = {
            date: '2025-03-08',
            gameBoard: [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "0"]
            ],
            extraLetter: 'B',
            hints: [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "P"]
            ]
        };
        mockSupabase.getGameboard.mockResolvedValue(mockData);

        const result = await supabaseFunctions.getGameboard();

        expect(mockSupabase.getGameboard).toHaveBeenCalled();
        expect(result).toEqual(mockData);
    });

    test('getStats should return user stats', async () => {
        const mockData = { user_id: 'testUserID', games_played: 10 };
        mockSupabase.getStats.mockResolvedValue(mockData);

        const result = await supabaseFunctions.getStats('testUSerID');

        expect(mockSupabase.getStats).toHaveBeenCalledWith('testUSerID');
        expect(result).toEqual(mockData);
    });

    test('getLeaderboard should return leaderboard data', async () => {
        const mockData = [{ user: 'Player1', score: 100 }];
        mockSupabase.getLeaderboard.mockResolvedValue(mockData);

        const result = await supabaseFunctions.getLeaderboard('2025-03-08');

        expect(mockSupabase.getLeaderboard).toHaveBeenCalledWith('2025-03-08');
        expect(result).toEqual(mockData);
    });

    test('updateUserStats should call the function correctly', async () => {
        mockSupabase.updateUserStats.mockResolvedValue(undefined);

        await supabaseFunctions.updateUserStats(60, 10, { user: { id: 'testUSerID' } }, 1);

        expect(mockSupabase.updateUserStats).toHaveBeenCalledWith(60, 10, { user: { id: 'testUSerID' } }, 1);
    });

    test('updateUserSolution should call the function correctly', async () => {
        mockSupabase.updateUserSolution.mockResolvedValue(undefined);

        await supabaseFunctions.updateUserSolution(60, 
            10, 
            [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "P"]
            ], 
            { user: { id: 'testUserID' } }, 
            '2025-03-08'
        );

        expect(mockSupabase.updateUserSolution).toHaveBeenCalledWith(60, 
            10, 
            [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "P"]
            ], 
            { user: { id: 'testUserID' } }, 
            '2025-03-08'
        );
    });

    test('updateUser should call the function correctly', async () => {
        mockSupabase.updateUser.mockResolvedValue(undefined);

        await supabaseFunctions.updateUser({ email: 'new@example.com', password: 'NewPassword', display_name: 'NewName' });

        expect(mockSupabase.updateUser).toHaveBeenCalledWith({ email: 'new@example.com', password: 'NewPassword', display_name: 'NewName' });
    });

    test('insertGameBoard should call the function correctly', async () => {
        mockSupabase.insertGameBoard.mockResolvedValue(undefined);

        await supabaseFunctions.insertGameBoard('2025-03-08', 
            [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "0"]
            ], 
            'P', 
            [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "P"]
            ]
        );

        expect(mockSupabase.insertGameBoard).toHaveBeenCalledWith('2025-03-08', 
            [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "0"]
            ], 
            'P', 
            [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "P"]
            ]
        );
    });
});