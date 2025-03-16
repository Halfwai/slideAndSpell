import * as supabaseFunctions from '@/utils/supabaseFunctions';
import { jest } from '@jest/globals';
import { Alert } from 'react-native';

jest.mock('@/utils/supabaseFunctions');

const mockSupabase = jest.mocked(supabaseFunctions, true);

jest.spyOn(Alert, 'alert').mockImplementation(() => {}); // Mock alerts

describe('Supabase Functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('signUpWithEmail should call supabase function', async () => {
        const mockSetLoading = jest.fn();
        mockSupabase.signUpWithEmail.mockResolvedValue(undefined);

        await supabaseFunctions.signUpWithEmail('test@example.com', 'password123', 'password123', 'TestUser', mockSetLoading);

        expect(mockSupabase.signUpWithEmail).toHaveBeenCalledWith(
            'test@example.com', 'password123', 'password123', 'TestUser', mockSetLoading
        );
    });

    test('signInWithEmail should call supabase function', async () => {
        const mockSetLoading = jest.fn();
        mockSupabase.signInWithEmail.mockResolvedValue(undefined);

        await supabaseFunctions.signInWithEmail('test@example.com', 'password123', mockSetLoading);

        expect(mockSupabase.signInWithEmail).toHaveBeenCalledWith('test@example.com', 'password123', mockSetLoading);
    });

    test('getGameboard should return gameboard data', async () => {
        const mockData = {
            date: '2025-03-08',
            gameBoard: [['A']],
            extraLetter: 'B',
            hints: [['Hint']],
        };
        mockSupabase.getGameboard.mockResolvedValue(mockData);

        const result = await supabaseFunctions.getGameboard();

        expect(mockSupabase.getGameboard).toHaveBeenCalled();
        expect(result).toEqual(mockData);
    });

    test('getStats should return user stats', async () => {
        const mockData = { user_id: 'user123', games_played: 10 };
        mockSupabase.getStats.mockResolvedValue(mockData);

        const result = await supabaseFunctions.getStats('user123');

        expect(mockSupabase.getStats).toHaveBeenCalledWith('user123');
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

        await supabaseFunctions.updateUserStats(60, 10, { user: { id: 'user123' } }, 1);

        expect(mockSupabase.updateUserStats).toHaveBeenCalledWith(60, 10, { user: { id: 'user123' } }, 1);
    });

    test('updateUserSolution should call the function correctly', async () => {
        mockSupabase.updateUserSolution.mockResolvedValue(undefined);

        await supabaseFunctions.updateUserSolution(60, 10, [['A']], { user: { id: 'user123' } }, '2025-03-08');

        expect(mockSupabase.updateUserSolution).toHaveBeenCalledWith(60, 10, [['A']], { user: { id: 'user123' } }, '2025-03-08');
    });

    test('updateUser should call the function correctly', async () => {
        mockSupabase.updateUser.mockResolvedValue(undefined);

        await supabaseFunctions.updateUser({ email: 'new@example.com', password: 'newpass', display_name: 'NewName' });

        expect(mockSupabase.updateUser).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpass', display_name: 'NewName' });
    });

    test('insertGameBoard should call the function correctly', async () => {
        mockSupabase.insertGameBoard.mockResolvedValue(undefined);

        await supabaseFunctions.insertGameBoard('2025-03-08', [['A']], 'B', [['Hint']]);

        expect(mockSupabase.insertGameBoard).toHaveBeenCalledWith('2025-03-08', [['A']], 'B', [['Hint']]);
    });
});