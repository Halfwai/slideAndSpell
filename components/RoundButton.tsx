import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { COLOURS } from "@/constants/colours";
import * as Haptics from 'expo-haptics';
import { useContext } from "react";
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
        >
        {props.iconType === "entypo" ? (
            <EntypoIcon name={props.icon} size={30} color={"black"} />
        ) : (
            <MaterialIcon name={props.icon} size={30} color={"black"} />
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
