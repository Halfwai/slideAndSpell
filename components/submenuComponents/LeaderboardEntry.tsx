import { Text, View, StyleSheet, Pressable, LayoutAnimation, Animated, Dimensions, TouchableOpacity } from 'react-native';
import MyAppText from '@/components/common/MyAppText';

import { formatSeconds } from '@/utils/helperFunctions';
import {useState, useRef, useEffect }from 'react';

import Tile from '@/components/common/Tile';

import { COLOURS } from '@/constants/colours';


interface LeaderboardEntryProps {
    index: string;
    display_name: string;
    slides: number;
    time_seconds: number;
    solution: string[][];
    showModel: Function
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
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.container}>
                <MyAppText style={styles.text}>{props.index}</MyAppText>
                <MyAppText style={styles.userNameText}>{props.display_name}</MyAppText>
                <MyAppText style={styles.text}>{props.slides}</MyAppText>
                <MyAppText style={styles.text}>{formatSeconds(props.time_seconds)}s</MyAppText>
                <TouchableOpacity onPress={() => {                           
                    if (!displayBoard) {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                        } else {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                        }
                        setDisplayBoard(!displayBoard)
                    }}
                    style={{flex: 1}}    
                >
                    <MyAppText>{displayBoard ? 'Hide' : 'Show'}</MyAppText>
                </TouchableOpacity>
            </View>
            <Animated.View style={[
                    styles.boardContainer,
                    {
                        height: height,
                    }
                ]}>
                <TouchableOpacity
                    onPress={() => {
                        props.showModel();
                    }}
                >
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
                </TouchableOpacity>

            </Animated.View>                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        paddingVertical: 20,
        backgroundColor: "white",
    }, 
    boardContainer: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: COLOURS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        width: "95%"
    },
    tileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.green,
        borderRadius: 10,
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16
    },
    userNameText: {
        flex: 2,
        textAlign: 'center',
        fontSize: 16
    }
});
