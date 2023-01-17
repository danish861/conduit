import React, { Fragment, useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Articles from "../Airticle/Articles";
import Router, { useRouter } from "next/router";
import Link from "next/link";
// import Favorites from "../../pages/[username]/favorites";
import ProfileInfo from "./ProfileInfo";
import { tabClasses } from "@mui/joy";
import authStore from "../../store/AuthStore";
import { AppContext } from "../../pages/_app";

const ProfleDetails = () => {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const [currentTab, setCurrentTab] = useState(0);
  const { currentTab, setCurrentTab } = useContext(AppContext);

  const router = useRouter();
  const { username } = router.query;

  console.log("===============  CURRENT TAB=========", currentTab);

  // console.log("username form profile details page ", router);

  // console.log("current tab outside of the useEffect", currentTab);

  // useEffect(() => {
  //   setCurrentTab(0);
  // }, [router.route]);
  // // console.log(username);

  return (
    <>
      <ProfileInfo />

      <div className="flex flex-col">
        <Tab.Group
          defaultIndex={currentTab}
          selectedIndex={currentTab}
          // selectedIndex={selectedIndex}
          // onChange={setSelectedIndex}
          onChange={setCurrentTab}

          // onChange={(currentTab) => {
          //   setCurrentTab(currentTab);
          // }}
        >
          <Tab.List className=" flex  gap-2 w-2/3  lg:ml-72  md:ml-28 sm:ml-28  ml-12 mt-10 ">
            <Tab as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  // href={`/${username}/`}
                  onClick={() =>
                    router.replace(
                      {
                        pathname: `/${username}/`,
                      },
                      undefined,
                      { shallow: true }
                    )
                  }
                  className={
                    selected
                      ? "text-green outline-none  border-b-2  border-b-green py-3"
                      : "text-gray-500 dark:text-gray-300"
                  }
                >
                  <p className=" w-32"> My Articles</p>
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  // href={`/${username}/favorites`}
                  // onClick={() => router.push(`/${username}/favorites`)}

                  onClick={() =>
                    router.replace(
                      {
                        pathname: `/${username}/favorites`,
                      },
                      undefined,
                      { shallow: true }
                    )
                  }
                  className={
                    selected
                      ? "text-green outline-none  border-b-2 border-b-green py-2"
                      : "text-gray-500 dark:text-gray-300"
                  }
                  // onClick={() => router.push("/favorites")}
                >
                  <p className="w-36">Favorited Article</p>
                </button>
              )}
            </Tab>
          </Tab.List>

          <hr className=" h-px bg-gray-100 border-0 dark:bg-gray-700 lg:ml-72  md:ml-28 sm:ml-28  ml-12  mr-72 " />

          {/* {authStore.username === username ? (
          ) : null} */}

          <Tab.Panels className="lg:w-2/3  md:w-4/5 sm:w-full    lg:ml-60  md:ml-20  ml-10">
            <Tab.Panel>
              <Articles query={`?author=${username}&`} />
              {/* <ProfilePage /> */}
            </Tab.Panel>
            <Tab.Panel>
              <Articles query={`?favorited=${username}&`} />
              {/* <Favorites /> */}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default ProfleDetails;
