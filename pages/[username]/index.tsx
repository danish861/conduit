import { useRouter } from "next/router";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import Head from "next/head";

import ProfleDetails from "../../components/Profile/ProfleDetails";

// import ProfleDetails from "../../components/Profile/ProfleDetails";

const ProfilePage = () => {
  const router = useRouter();
  const { query, asPath } = useRouter();
  const username = query.username;

  return (
    <>
      <Head>
        <title>{`@ ${username} -- Conduit`}</title>
      </Head>

      {/* <ProfileInfo /> */}

      <ProfleDetails />

      {/* <Articles query={`?author=${username}&`} /> */}

      {/* <Link href="/faborites">Fab article</Link> */}
    </>
  );
};

export default ProfilePage;

// <div className="flex flex-col">
//         <Tab.Group
//           defaultIndex={0}
//           selectedIndex={currentTab}
//           onChange={(currentTab) => {
//             setCurrentTab(currentTab);
//           }}
//         >
//           <Tab.List className=" flex  gap-2 w-2/3  lg:ml-72  md:ml-28 sm:ml-28  ml-12 mt-10 ">
//             <Tab as={Fragment}>
//               {({ selected }) => (
//                 /* Use the `selected` state to conditionally style the selected tab. */
//                 <button
//                   onClick={() =>
//                     router.replace(
//                       {
//                         pathname: `/${username}/`,
//                       },
//                       undefined,
//                       { shallow: true }
//                     )
//                   }
//                   className={
//                     selected
//                       ? "text-green outline-none  border-b-2  border-b-green py-3"
//                       : "text-gray-500 dark:text-gray-300"
//                   }
//                 >
//                   <p className=" w-32"> My Articles</p>
//                 </button>
//               )}
//             </Tab>

//             <Tab as={Fragment}>
//               {({ selected }) => (
//                 <button
//                   // onClick={() => router.push(`/${username}/favorites`)}

//                   onClick={() =>
//                     router.replace(
//                       `/${username}/favorites`,

//                       undefined,
//                       { shallow: true }
//                     )
//                   }
//                   className={
//                     selected
//                       ? "text-green outline-none  border-b-2 border-b-green py-2"
//                       : "text-gray-500 dark:text-gray-300"
//                   }
//                   // onClick={() => router.push("/favorites")}
//                 >
//                   <p className="w-36">Favorited Article</p>
//                 </button>
//               )}
//             </Tab>
//           </Tab.List>
//           {/* <hr className=" h-px bg-gray-200 border-0 dark:bg-gray-700 lg:w-2/3 w-4/5 lg:ml-72  md:ml-28 sm:ml-28  ml-10 " /> */}

//           <Tab.Panels className="lg:w-2/3  md:w-4/5 sm:w-full lg:ml-60  md:ml-20  ml-10">
//             <Tab.Panel>
//               <Articles query={`?author=${username}&`} />
//             </Tab.Panel>
//             <Tab.Panel>
//               <Articles query={`?favorited=${username}&`} />
//             </Tab.Panel>
//           </Tab.Panels>
//         </Tab.Group>
//       </div>
