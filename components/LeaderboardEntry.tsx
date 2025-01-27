import { Text, View, StyleSheet, Pressable, LayoutAnimation, Animated, Dimensions } from 'react-native';
import MyAppText from '@/components/MyAppText';

import { formatSeconds } from '@/utils/helperFunctions';
import {useState, useRef, useEffect }from 'react';

import GameBoard from './Gameboard';

import Tile from '@/components/Tile';

import { COLOURS } from '@/constants/colours';


interface LeaderboardEntryProps {
    index: number;
    display_name: string;
    slides: number;
    time_seconds: number;
    solution: string[][];
}


export default function LeaderboardEntry(props: LeaderboardEntryProps) {
    const tileSize = Dimensions.get('window').width / 10;


    const height = useRef(new Animated.Value(0)).current;
    const [opacity, setOpacity] = useState(0);

    const [displayBoard, setDisplayBoard] = useState(false);

    useEffect(() => {
        if (displayBoard) {
            showBoard();
            return;
        }
        hideBoard();
    }, [displayBoard]);

    const showBoard = () => {
        Animated.spring(height, {
            toValue: tileSize * (props.solution.length + 1),
            useNativeDriver: false
        }).start();
        setTimeout(() => {
            setOpacity(1);
        }, 300);
    }

    const hideBoard = () => {
        Animated.timing(height, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
        setOpacity(0);

    }


    return (
        <View>
            <View style={styles.container}>
            <MyAppText>{props.index + 1}</MyAppText>
                    <MyAppText>{props.display_name}</MyAppText>
                    <MyAppText>{props.slides}</MyAppText>
                    <MyAppText>{formatSeconds(props.time_seconds)}s</MyAppText>
                <Pressable onPress={() => {                           
                    if (!displayBoard) {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                        } else {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                        }
                        setDisplayBoard(!displayBoard)
                    }}>
                    <MyAppText>{displayBoard ? 'Hide' : 'Show'}</MyAppText>
                </Pressable>
            </View>

                <Animated.View style={[
                        styles.boardContainer,
                        {
                            height: height,
                        }
                    ]}>
                    {props.solution.map((row, index) => (
                        <Animated.View key={index} style={{flexDirection: 'row', opacity: opacity}}>
                            {row.map((letter, i) => (
                                <View key={i} style={[styles.tileContainer, {width: tileSize, height: tileSize, display: displayBoard ? 'flex' : 'none'}]}>
                                    <Tile 
                                        letter={letter}
                                    />
                                </View>

                            ))}
                        </Animated.View>
                        ))}
                </Animated.View>
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width: '100%', 
        padding: 10,
    }, 
    boardContainer: {
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    tileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.green,
        borderRadius: 10,
    },
});
