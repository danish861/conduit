import { deleteCookie, setCookie } from "cookies-next";
import { Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getUser, updateUser } from "../APIs/user";
import authStore from "../store/AuthStore";

interface FormValues {
  image: string;
  username: string;
  bio: string;
  email: string;
  password: string;
}

const SettingsPage = () => {
  // const [user, setUser] = useState({
  //   image: "",
  //   username: "",
  //   bio: "",
  //   email: "",
  //   password: "",
  // });

  const [error, setError] = useState(null);
  const [fetch, setFetch] = useState(false);
  const router = useRouter();

  // the very same error occure in the main website but on page relaod I had this issue with on page click also
  // const { data, error: err } = useSWR("/user", (url) => getUser(url));

  //NOTE:  initially show the null value in bio and didn't update on run time // FIND   IF THERE ANYWAY POSSIBLE IN THIS  // reslove issue was with formik
  //    run useSWR with condition on useEffect : ##CHECK
  // error: initially show the null value in bio and didn't update on run time
  // console.log(userData);

  const { data, error: err } = useSWR("/user", (url) => getUser(url));

  if (!data) {
    return;
  }
  const user = data.user;

  console.log(typeof user.username);

  // useEffect(() => {
  //   const userData = async () => {
  //     const { user } = await getUser("/user");
  //     console.log(user);
  //     setUser({ ...user });
  //   };
  //   userData();
  // }, []);

  return (
    <>
      <Head>
        <title>Setting -- Conduit</title>
      </Head>
      <Formik
        enableReinitialize={true}
        initialValues={{
          image: user.image,
          username: user.username,
          bio: user?.bio,
          email: user.email,
          password: "",
          action: "",
        }}
        onSubmit={async (values) => {
          ///////////////////////////////////////////////////
          if (values.action === "update") {
            updateUser("/user", {
              user: {
                email: values.email,
                username: values.username,
                password: values.password,
                bio: values.bio,
                image: values.image,
              },
            })
              .then((data) => {
                if (data.user) {
                  authStore.username = data.user.username;
                  router.push(`/${data.user.username}`);
                  setCookie("authToken", user.token, {
                    maxAge: 30 * 24 * 60 * 60,
                  });
                }
              })
              .catch((error) => {
                setError(error.response.data);
                console.log(error.response.data);
              });
          }

          /////////////////////////////

          if (values.action === "logout") {
            console.log("logout button clicked");
            localStorage.removeItem("token");
            authStore.isLoggedIn = false;
            deleteCookie("authToken");
            router.push("/");
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col justify-center items-center  gap-4 mt-10 ">
            <div className=" md:w-2/5 w-full  p-3 ">
              <h1 className="text-4xl text-center  mb-4"> Your Settings </h1>

              {error ? <h1>Something went wrong</h1> : null}
              <Field
                type="text"
                name="image"
                placeholder="URL of profile picture"
                className="  text-slate-600   block w-full  p-1.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
              />
              <Field
                type="text"
                name="username"
                placeholder="Your Name"
                className="  text-gray-600   block w-full  p-2.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
              />
              <Field
                component="textarea"
                name="bio"
                placeholder="Short bio about you"
                className="text-slate-600  p-4 block w-full h-36  border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
              />
              <Field
                type="text"
                name="email"
                log
                placeholder="Email"
                className="  text-slate-600   block w-full  p-2.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
              />
              <Field
                type="text"
                name="password"
                placeholder="New Password"
                className="  text-slate-600   block w-full  p-2.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
              />

              <button
                type="submit"
                name="update"
                className=" btn bg-green  hover:bg-emerald-600 py-3 px-6 rounded font-medium text-white  float-right mb-3 "
                onClick={() => setFieldValue("action", "update")}
              >
                Update Setting
              </button>

              <button
                type="submit"
                name="logout"
                className=" btn bg-gray-50  hover:bg-logoutColor py-2 px-3 rounded text-logoutColor hover:text-white border border-logoutColor   mb-3 "
                onClick={() => setFieldValue("action", "logout")}
              >
                Or click here to logout
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SettingsPage;
