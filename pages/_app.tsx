import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";
import "../mobx-config";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "mobx-react";

type MyAppProps = {
  Component: React.ComponentType;
  pageProps: any;
  stores: { [key: string]: any }; //
};

// stores type
import authStore from "../store/AuthStore";

import { create } from "mobx-persist";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps, stores }: MyAppProps) {
  // persist data
  const hydrate = create();
  typeof window === "undefined"
    ? false
    : hydrate("authStore", authStore).then(() => {});

  return (
    <Provider {...stores}>
      <ThemeProvider>
        <Layout>
          <NextNProgress
            options={{ showSpinner: false }}
            color="#5cb85c"
            height={2}
          />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
