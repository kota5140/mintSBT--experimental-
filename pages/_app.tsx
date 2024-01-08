import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme";
import LeftBar from "../components/side-bar";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

let externalSetLoginStatus: (status: boolean) => void;

// ログインステータスを変更する関数をエクスポート
function MyApp({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Update the external setLoginStatus function when the local one changes
    externalSetLoginStatus = setIsLoggedIn;
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn && router.pathname != "/verifier") {
      router.push("/");
    }
  }, [isLoggedIn, router.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <Header />
        <div>
          {isLoggedIn && <LeftBar />}
          <div style={{ marginLeft: isLoggedIn ? "240px" : "0" }}>
            <Component {...pageProps} />
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}

// MyApp コンポーネントと setLoginStatus 関数を同じモジュールからエクスポート
export default MyApp;

// setLoginStatus 関数を外部で使用できるようにエクスポート
export function setLoginStatus(status: boolean) {
  if (externalSetLoginStatus) {
    externalSetLoginStatus(status);
  }
}
