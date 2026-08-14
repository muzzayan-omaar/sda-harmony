const colors = {
  // Deep indigo — primary brand color, buttons, active states
  primary: "#4B3F92",
  primaryLight: "#6C5CE0",
  primaryDark: "#332B66",

  // Gold — worship/glory accent, badges, "verified choir" star, highlights
  accent: "#F5A623",
  accentLight: "#FFC862",

  // Teal — secondary accent, waveforms, success-adjacent UI
  secondary: "#0F6E56",
  secondaryLight: "#1D9E75",

  background: "#0A0E1A",
  surface: "#12182B",
  surfaceElevated: "#1B2340",

  text: "#FFFFFF",
  textSecondary: "#9AA3B8",
  textMuted: "#6B7280",

  success: "#22C55E",
  warning: "#FACC15",
  error: "#EF4444",

  border: "#232B45",

  // Use as { colors: [...], start: {x:0,y:0}, end: {x:1,y:1} } with expo-linear-gradient
  gradientPrimary: ["#4B3F92", "#6C5CE0"],
  gradientHero: ["#0A0E1A", "#2A1F4D"],
  gradientGold: ["#F5A623", "#FFC862"],
};

export default colors;