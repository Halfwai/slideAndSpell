import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";

interface RoundButtonProps {
  icon: string;
  onPress: () => void;
  iconType?: "material" | "entypo";
}

export default function RoundButton(props: RoundButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      {props.iconType === "entypo" ? (
        <EntypoIcon name={props.icon} size={30} color={"white"} />
      ) : (
        <MaterialIcon name={props.icon} size={30} color={"white"} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderRadius: 50,
    padding: 15,
  },
});
