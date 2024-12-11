import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Direction } from '../constants/enums';

export const Tile = (props : {value : number, position : {y : number, x: number}, slidable : Direction}) => {
    console.log(props);
    return (
        <View>
            {props.value === 0 ? null : 
                <TouchableOpacity
                    style={[
                        styles.tile,
                        {
                            left: props.position.y * 75,
                            top: props.position.x * 75
                        }
                    ]}
                >
                    <Text style={styles.text}>{props.value}</Text>
                </TouchableOpacity> 
            }

        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        width: 75,
        height: 75,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
    }
});