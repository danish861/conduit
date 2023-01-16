import React, { Fragment } from "react";
import Articles from "../components/Airticle/Articles";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import PopularTag from "../components/Tags/PopularTag";
import { FiHash } from "react-icons/fi";

import authStore from "../store/AuthStore";
import { observer } from "mobx-react-lite";
import Head from "next/head";

const HomePage = () => {
  const [tagName, setTagName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const hash = router.asPath.split("#")[1] || "";
  // const showModal = hash === "modal1" ? true : false;

  const handleTag = (tagName: string) => {
    authStore.isLoggedIn ? setSelectedIndex(2) : setSelectedIndex(1);
    setTagName(tagName);
  };

  // const handleBaseUrl = () => {
  //   router.push({
  //     pathname: "/",
  //     hash: "/",
  //   });
  // };

  return (
    <>
      <Head>
        <title>Home -- Conduit</title>
        <meta
          name="conduit"
          content=" A place, where you will get all the information you need"
        />
      </Head>

      {authStore.isLoggedIn ? null : (
        <div className="bg-green flex flex-col  items-center p-10 gap-3">
          <h1 className="font-Titillium  text-5xl font-bold text-zinc-100">
            conduit
          </h1>
          <p className="text-zinc-100  text-xl">
            A place to share your knowledge
          </p>
        </div>
      )}

      <div className=" flex md:flex-row flex-col  gap-2 lg:mx-48  mx-11 my-10  ">
        <div className=" md:w-10/12 w-full   ">
          <Tab.Group
            defaultIndex={selectedIndex}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          >
            <Tab.List className=" md:ml-10  sm:ml-16 flex gap-5">
              {authStore.isLoggedIn ? (
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? "text-green outline-none  border-b-2 border-b-green py-2"
                          : "text-gray-500  dark:text-gray-200 "
                      }
                    >
                      Your Feed
                    </button>
                  )}
                </Tab>
              ) : null}
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "text-green outline-none  border-b-2 border-b-green py-2"
                        : " text-gray-500  dark:text-gray-200  "
                    }
                  >
                    Global Feed
                  </button>
                )}
              </Tab>
              {(authStore.isLoggedIn
                ? selectedIndex === 2
                : selectedIndex === 1) && (
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? "text-green outline-none  border-b-2 border-b-green py-2"
                          : " text-gray-500  dark:text-gray-200 "
                      }
                    >
                      <div className="flex items-center gap-1">
                        <FiHash fontSize={20} /> {tagName}
                      </div>
                    </button>
                  )}
                </Tab>
              )}
            </Tab.List>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 md:ml-10 sm:ml-16 " />
            <Tab.Panels>
              {authStore.isLoggedIn ? (
                <Tab.Panel>
                  <Articles query="feed?" url="/" />
                </Tab.Panel>
              ) : null}
              <Tab.Panel>
                <Articles query="?" url="/" />
              </Tab.Panel>
              <Tab.Panel>
                <Articles query={`?tag=${tagName}&`} url="/" />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <PopularTag handleTag={handleTag} />
      </div>

      {/* <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700   mx-9  md:mx-48  mt-9  " /> */}
    </>
  );
};

export default observer(HomePage);
