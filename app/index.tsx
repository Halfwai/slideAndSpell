import { Text, View, Image } from "react-native";
import MenuButton from "@/components/MenuButton";


export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#CBE6F7"
            }}
        >
            <Image 
                source={require("@/assets/images/logo.png")}
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
            />
            <MenuButton />

        </View>
    );
}
