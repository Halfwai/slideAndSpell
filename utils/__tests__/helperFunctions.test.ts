import * as helperFunctions from '@/utils/helperFunctions';
import { jest } from '@jest/globals';
import { Alert } from 'react-native';

jest.mock('@/utils/helperFunctions');
const mockHelper = jest.mocked(helperFunctions, { shallow: true });

test('getDefinitions should attempt api call', async () => {
    mockHelper.getDefinition.mockResolvedValue(undefined);
    await helperFunctions.getDefinition('test', 'test');

    expect(mockHelper.getDefinition).toHaveBeenCalledWith('test', 'test');
});