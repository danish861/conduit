import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";
import "../mobx-config";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "mobx-react";
import authStore from "../store/AuthStore";
import { useEffect } from "react";

type MyAppProps = {
  Component: React.ComponentType;
  pageProps: any;
  stores: { [key: string]: any }; //
};

import { create } from "mobx-persist";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps, stores }: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    function handleHashChange() {
      const currentHash = window.location.hash.slice(1);
      router.push("/", "", { shallow: true });
      router.replace(`/${currentHash}`, `/${currentHash}`, { shallow: true });
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [router.events]);

  const hydrate = create();
  typeof window === "undefined"
    ? false
    : hydrate("authStore", authStore).then(() => {});

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <Provider {...stores}>
        <ThemeProvider attribute="class">
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
    </>
  );
}
