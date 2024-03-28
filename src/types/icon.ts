import { Ionicons } from "@expo/vector-icons";

export type Icon = {
  color?: string;
  size?: number;
  name?: keyof typeof Ionicons.glyphMap;
};
