import { Text } from "react-native";

import Screen from "@/components/ui/Screen";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <Screen>
      <Text className="text-white text-3xl font-bold mt-12 mb-6">
        Featured Song
      </Text>

      <Card>
        <Text className="text-white text-xl font-bold">
          Katonda Ali Wamu Nange
        </Text>

        <Text className="text-slate-400 mt-2">
          Watoto Church Choir
        </Text>
      </Card>
    </Screen>
  );
}