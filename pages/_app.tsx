import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/document";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <link
        href="https://fonts.googleapis.com/css2?family=Play&family=Source+Sans+3&display=swap"
        rel="stylesheet"
      />
      <div>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default App;
