import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      light: "#f6cc79",
      main: "#f3bb4b",
      dark: "#f0a819",
      contrastText: "#241c24",
    },
    secondary: {
      light: "#d6310a",
      main: "#a72608",
      dark: "#751b06",
      contrastText: "#f4eccc",
    },
  },
});

interface MuiThemeProviderProps {
  children: ReactNode;
}

export default function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
