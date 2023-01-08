import { useRouter } from "next/router";
import FollowButton from "../components/common/FollowButton";
import { RiSettings4Fill } from "react-icons/ri";
import authStore from "../store/AuthStore";

import ProfileInfo from "../components/Profile/ProfileInfo";
import Head from "next/head";

const profilePage = () => {
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

export default profilePage;
