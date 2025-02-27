import { createTamagui, createTokens } from "tamagui";
import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { themes, tokens } from "@tamagui/themes";

const interFont = createInterFont();

const tamaguiConfig = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont,
  },
  tokens,
  themes,
  shorthands,
});

export default tamaguiConfig;
export { tamaguiConfig };
