import React from 'react';
import { Pressable, TouchableWithoutFeedback, View } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import { COLOURS } from '@/constants/colours';
import { DateType } from 'react-native-ui-datepicker';

interface WordsDefinitionsModelProps {
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    setOpenDatePicker: (open: boolean) => void;
}

export default function WordsDefinitionsModel(props: WordsDefinitionsModelProps) {
    const useDateTimePicker = (params: { date: DateType }) => {
        if (!params.date) return;
        let date = new Date(params.date as Date);
        date.setDate(date.getDate() + 1);
        const dateString = date.toISOString().split('T')[0];
        props.setSelectedDate(dateString);
        setTimeout(() => {
            props.setOpenDatePicker(false);
        }, 100);
    }
    return (
        <Pressable
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                padding: 20,
            }}
            onPress={() => props.setOpenDatePicker(false)}
        >
            <TouchableWithoutFeedback>
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: COLOURS.green,
                    }}>
                    <DateTimePicker
                        mode="single"
                        date={props.selectedDate}
                        onChange={(params) => {
                            useDateTimePicker(params);
                        }
                        }
                    />
                </View>
            </TouchableWithoutFeedback>
        </Pressable>
    )
}