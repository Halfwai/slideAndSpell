import { Dimensions } from 'react-native';


export const SIZES = {
    GAMEBOARD: Math.min(Dimensions.get("screen").height * 0.45, Dimensions.get("window").width * 0.85),
}