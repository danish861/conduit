import Head from "next/head";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";

import React, { Fragment, useState } from "react";
import Articles from "../../components/Airticle/Articles";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfleDetails from "../../components/Profile/ProfleDetails";
import ProfilePage from ".";

const Favorites = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();
  const username = router.query.username;

  //   console.log(router);
  return (
    <>
      <Head>
        <title>{`Articles favourated by  ${username}`}</title>
      </Head>

      {/* <ProfilePage /> */}

      {/* <ProfileInfo /> */}
      <ProfleDetails />
      {/* <ProfilePage /> */}

      {/* <Articles query={`?favorited=${username}&`} /> */}
      {/* <Articles query={`?favorited=${username}&`} /> */}
    </>
  );
};

export default Favorites;

// <ProfileInfo />

// <div className="flex flex-col">
//   <Tab.Group
//     defaultIndex={0}
//     selectedIndex={selectedIndex}
//     onChange={setSelectedIndex}
//   >
//     <Tab.List className=" flex  gap-2 w-2/3  lg:ml-72  md:ml-28 sm:ml-28  ml-12 mt-10 ">
//       <Tab as={Fragment}>
//         {({ selected }) => (
//           /* Use the `selected` state to conditionally style the selected tab. */
//           <button
//             className={
//               selected
//                 ? "text-green outline-none  border-b-2  border-b-green py-3"
//                 : "text-gray-500 dark:text-gray-300"
//             }
//           >
//             <p className=" w-32"> My Articles</p>
//           </button>
//         )}
//       </Tab>

//       <Tab as={Fragment}>
//         {({ selected }) => (
//           <button
//             onClick={() => router.push(`/${username}/favorites`)}
//             className={
//               selected
//                 ? "text-green outline-none  border-b-2 border-b-green py-2"
//                 : "text-gray-500 dark:text-gray-300"
//             }
//             // onClick={() => router.push("/favorites")}
//           >
//             <p className="w-36">Favorited Article</p>
//           </button>
//         )}
//       </Tab>
//     </Tab.List>
//     {/* <hr className=" h-px bg-gray-200 border-0 dark:bg-gray-700 lg:w-2/3 w-4/5 lg:ml-72  md:ml-28 sm:ml-28  ml-10 " /> */}

//     <Tab.Panels className="lg:w-2/3  md:w-4/5 sm:w-full    lg:ml-60  md:ml-20  ml-10">
//       <Tab.Panel>
//         <Articles query={`?author=${username}&`} />
//       </Tab.Panel>
//       <Tab.Panel>
//         <Articles query={`?favorited=${username}&`} />
//       </Tab.Panel>
//     </Tab.Panels>
//   </Tab.Group>
// </div>
