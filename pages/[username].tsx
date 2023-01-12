import { useRouter } from "next/router";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Head from "next/head";
import { useEffect } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const { query, asPath } = useRouter();
  const username = query.username;
  // console.log(username);

  // console.log(username);
  // console.log(decodeURI(asPath));

  // useEffect(() => {
  //   if (asPath.includes(`${username}`)) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>{`@ ${username} -- Conduit`}</title>
      </Head>
      <ProfileInfo />
    </>
  );
};

export default ProfilePage;
