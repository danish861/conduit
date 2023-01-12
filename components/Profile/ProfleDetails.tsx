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
          <Tab.List className=" flex gap-3 w-2/3   lg:ml-72  md:ml-28 sm:ml-28  ml-12 mt-10 ">
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
          <hr className=" h-px bg-gray-200 border-0 dark:bg-gray-700 lg:w-2/3 w-4/5 lg:ml-72  md:ml-28 sm:ml-28  ml-10 " />

          <Tab.Panels className="    lg:w-2/3  md:w-4/5 sm:w-full    lg:ml-60  md:ml-20  ml-10">
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
