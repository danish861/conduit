import { useRouter } from "next/router";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Head from "next/head";

const ProfilePage = () => {
  const { query } = useRouter();
  const username = query.username;
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
