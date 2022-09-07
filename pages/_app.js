import { useEffect } from "react";
import "../styles/globals.css";
import NProgress from "nprogress";
import Layout from "../components/layout";
import { ToastContainer } from "react-toastify";

import "/public/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "../context/store";
import Head from "next/head";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <StoreProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>GOLD DUST</title>
        <meta name="description" content="GOLD DUST" />
        <meta property="og:image" content={require("../public/vercel.svg")} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </StoreProvider>
  );
};

export default MyApp;
