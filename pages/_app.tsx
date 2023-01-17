import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";
import "../mobx-config";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "mobx-react";
import authStore from "../store/AuthStore";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

type MyAppProps = {
  Component: React.ComponentType;
  pageProps: any;
  stores: { [key: string]: any }; //
};

import { create } from "mobx-persist";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import { createContext, useState } from "react";

export interface AppContextProps {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
}

export const AppContext = createContext<AppContextProps>({
  currentTab: 0,
  setCurrentTab: () => {},
});

export default function App({ Component, pageProps, stores }: MyAppProps) {
  const router = useRouter();

  const isFabSelected = router.asPath.includes("/favorites");

  const [currentTab, setCurrentTab] = useState(isFabSelected ? 1 : 0);

  // useEffect(() => {
  //   function handleHashChange() {
  //     const currentHash = window.location.hash.slice(1);
  //     router.push("/", "", { shallow: true });
  //     router.replace(`/${currentHash}`, `/${currentHash}`, { shallow: true });
  //   }

  //   window.addEventListener("hashchange", handleHashChange);

  //   return () => {
  //     window.removeEventListener("hashchange", handleHashChange);
  //   };
  // }, [router.events]);

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
      <AppContext.Provider value={{ currentTab, setCurrentTab }}>
        <Provider {...stores}>
          <ThemeProvider attribute="class">
            <Layout>
              <NextNProgress
                options={{ showSpinner: false }}
                color="#5cb85c"
                height={2}
              />
              <Component {...pageProps} />
              <ToastContainer />
            </Layout>
          </ThemeProvider>
        </Provider>
      </AppContext.Provider>
    </>
  );
}
