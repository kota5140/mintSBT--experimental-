import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Play&family=Source+Sans+3&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
