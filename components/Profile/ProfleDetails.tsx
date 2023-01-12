import React, { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import Articles from "../Airticle/Articles";
import { useRouter } from "next/router";

const ProfleDetails = () => {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <div className="flex flex-col ">
        <Tab.Group
          defaultIndex={0}
          // selectedIndex={selectedIndex}
          // onChange={setSelectedIndex}
        >
          <Tab.List className=" flex gap-3 w-2/3   md:ml-72 ml-20 mt-10 ">
            <Tab as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected
                      ? "text-green outline-none  border-b-2 border-b-green py-2"
                      : "text-black dark:text-gray-300"
                  }
                >
                  My Articles
                </button>
              )}
            </Tab>

            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "text-green outline-none  border-b-2 border-b-green py-2"
                      : "text-black dark:text-gray-300"
                  }
                >
                  Favorited Article
                </button>
              )}
            </Tab>
          </Tab.List>
          <hr className=" h-px bg-gray-200 border-0 dark:bg-gray-700 w-2/3  ml-72 " />

          <Tab.Panels className=" md:w-2/3   sm:w-3/4     md:ml-56  ml-14  ">
            <Tab.Panel>
              <Articles query={`?author=${username}&`} url="/" />
            </Tab.Panel>
            <Tab.Panel>
              <Articles query={`?favorited=${username}&`} url="/" />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default ProfleDetails;
