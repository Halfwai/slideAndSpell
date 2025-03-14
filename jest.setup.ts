jest.mock('@expo/vector-icons', () => ({
    Entypo: () => 'EntypoMock',
    MaterialCommunityIcons: () => 'MaterialCommunityIconsMock',
}));

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
