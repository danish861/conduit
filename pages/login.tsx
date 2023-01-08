import Head from "next/head";
import Link from "next/link";
import Signin from "../components/HomePage/Signin";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Signin -- Conduit</title>
      </Head>
      <Signin />
    </>
  );
};

export default LoginPage;
