import { Alert } from "react-native";

import Screen from "@/components/ui/Screen";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <Screen>
      <Button
        title="Continue"
        onPress={() => Alert.alert("Success", "Button Works!")}
      />
    </Screen>
  );
}