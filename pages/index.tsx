import React, { Fragment } from "react";
import Articles from "../components/Airticle/Articles";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import PopularTag from "../components/Tags/PopularTag";
import { useTheme } from "next-themes";

import authStore from "../store/AuthStore";
import { observer } from "mobx-react-lite";
import DialogCmponent from "../components/layouts/DialogCmponent";
import Head from "next/head";

const HomePage = () => {
  // const { theme, setTheme } = useTheme();
  const [tagName, setTagName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleTag = (tagName: string) => {
    setTagName(tagName);
  };
  return (
    <>
      <Head>
        <title>Home -- Conduit</title>
        <meta
          name="conduit"
          content=" A place, where you will get all the information you need"
        />
      </Head>

      <div className="bg-green flex flex-col  items-center p-10 gap-3">
        <h1 className="font-Titillium  text-5xl font-bold text-zinc-100">
          conduit
        </h1>
        <p className="text-zinc-100  text-xl">
          A place to share your knowledge
        </p>

        {/* <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="system">System</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select> */}

        {/* <DialogCmponent /> */}
      </div>

      <div className=" flex md:flex-row flex-col  gap-2 lg:mx-48  mx-11 my-10  ">
        <div className=" md:w-10/12 w-full  ">
          <Tab.Group
            defaultIndex={selectedIndex}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          >
            <Tab.List className=" ml-10 flex gap-5   ">
              {authStore.isLoggedIn ? (
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? "text-green outline-none  border-b-2 border-b-green py-2"
                          : "bg-white text-gray-500"
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
                        : "bg-white text-gray-500"
                    }
                  >
                    Global Feed
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? "text-green outline-none  border-b-2 border-b-green py-2"
                        : "bg-white text-gray-500"
                    }
                  >
                    {tagName}
                  </button>
                )}
              </Tab>
            </Tab.List>
            <hr className=" h-px bg-gray-200 border-0 dark:bg-gray-700 ml-10" />
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
