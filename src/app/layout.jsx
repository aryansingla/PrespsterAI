"use client";
import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeSettings } from "@/utils/theme/Theme";
// import { store } from "@/store/store";
// import { useSelector } from "@/store/hooks";
// import { AppState } from "@/store/store";
import { Provider } from "react-redux";
import NextTopLoader from "nextjs-toploader";
import "@/app/global.css";
// import "@/utils/i18n";
// import "react-quill/dist/quill.snow.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { SnackbarProvider } from "notistack";
// import MessageHandler from "@/components/Common/MessageHandler/MessageHandler";
import { SessionProvider } from "next-auth/react";
// import MultipleError from "@/components/Common/SnackbarComponent/MultipleError";
import { IconCircleXFilled } from "@tabler/icons-react";
import { ToastContainer } from "./nextToast";
import 'react-toastify/dist/ReactToastify.css';
import theme from "@/theme";

export const MyApp = ({ children }) => {
  // const theme = ThemeSettings();
  // const { open, message, variant, type } = useSelector(
  //   (state: AppState) => state.message
  // );
  return (
    <>
      <NextTopLoader showSpinner={false} color="#5D87FF" />
        {/* <ThemeProvider theme={theme}> */}
          <CssBaseline />
          {children}
          {/* {open && (
            <MessageHandler message={message} variant={variant} type={type} />
          )} */}
        {/* </ThemeProvider> */}
    </>
  );
};

export default function RootLayout({
  children,
  pageProps,
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={pageProps?.session}>
          {/* <Provider store={store}>
            <SnackbarProvider
              Components={{ error: MultipleError }}
              iconVariant={{error : <IconCircleXFilled />}}
              maxSnack={3}
              style={{
                maxWidth: "450px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            > */}
            <ThemeProvider theme={theme}>
              <MyApp>
                {children}
                <ToastContainer />
              </MyApp>
              </ThemeProvider>
            {/* </SnackbarProvider>
          </Provider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
