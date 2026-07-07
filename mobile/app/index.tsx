import Screen from "@/components/ui/Screen";
import EmptyState from "@/components/ui/EmptyState";

export default function Home() {
  return (
    <Screen>
      <EmptyState
        title="No Songs Yet"
        description="Songs uploaded by choirs will appear here."
      />
    </Screen>
  );
}