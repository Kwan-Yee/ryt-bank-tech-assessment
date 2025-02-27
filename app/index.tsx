import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Prolly gonna just use index as the auth page</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
