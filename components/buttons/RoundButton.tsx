import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { COLOURS } from "@/constants/colours";
import * as Haptics from 'expo-haptics';
import React, { useContext } from "react";
import { UserContext } from "@/utils/context";


interface RoundButtonProps {
  icon: string;
  onPress: () => void;
  iconType?: "material" | "entypo";
  colour?: string;
}

export default function RoundButton(props: RoundButtonProps) {
    const userContext = useContext(UserContext);
    return (
        <TouchableOpacity 
            style={[styles.button, props.colour && {backgroundColor: props.colour}]} 
            onPress={async () => {
                if (userContext && userContext.vibrate) {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                props.onPress()
            }}
            testID="roundButton"
        >
        {props.iconType === "entypo" ? (
            <Entypo name={props.icon as any} size={30} color={"black"} />
        ) : (
            <MaterialCommunityIcons name={props.icon as any} size={30} color={"black"} />
        )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderColor: COLOURS.green,
    borderWidth: 2,
    borderRadius: 50,
    padding: 15,
  },
});
