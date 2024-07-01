// Theme.ts
import { DefaultTheme } from "react-native-paper";

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976d2',
    secondary: "#ff962d",
    surface: "#fff",
    background: "#fff",
    text: "#000",
    border: "#ccc",
    error: "#ff0000",
    warning: "#ffcc00",
    info: "#00ccff",
    success: "#00cc00",
  },
  button: {
    pill: {
      borderRadius: 30,
    },
    rounded: {
      borderRadius: 10,
    },
    square: {
      borderRadius: 0,
    },
  },
  size: {
    small: 12,
    medium: 16,
    large: 24,
    xl: 32,
  },
  font: {
    small: 12,
    medium: 16,
    large: 24,
    xl: 32,
  },
  icon: {
    small: 12,
    medium: 16,
    large: 24,
    xl: 32,
  },

};
