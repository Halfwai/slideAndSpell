import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { COLOURS } from "@/constants/colours";

interface RoundButtonProps {
  icon: string;
  onPress: () => void;
  iconType?: "material" | "entypo";
}

export default function RoundButton(props: RoundButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
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
