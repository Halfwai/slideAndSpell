import {Text, View, StyleSheet } from "react-native";
import { COLOURS } from "@/constants/colours";
import {useContext} from "react";

import MyAppText from "@/components/MyAppText";
import { Supabase } from "@/utils/supabaseFunctions";
import { SessionContext } from "@/utils/context";


export default function Stats() {
    const session = useContext(SessionContext);


    return (
        <View style={styles.container}>
            <MyAppText style={styles.heading}>Stats</MyAppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOURS.blue,
        width: "100%",
    },
    heading: {
        fontSize: 40,
    }
});