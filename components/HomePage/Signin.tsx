import Link from "next/link";
import React from "react";
import { observer } from "mobx-react";
import { Formik, Form, Field } from "formik";
import authStore from "../../store/AuthStore";
import { useRouter } from "next/router";

const Signin = observer(() => {
  const router = useRouter();
  const err = authStore.error;
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {
        authStore
          .postLogInUsers("users/login", {
            user: {
              email: values.email,
              password: values.password,
            },
          })
          .then((data) => {
            if (data.user) {
              router.push("/");
            }
          });
      }}
    >
      {({ isSubmitting }) => (
        <>
          <div className="text-center m-4">
            <h1 className="text-3xl text-zinc-700">Sign in</h1>
            <Link href="/register" className="text-green hover:underline">
              Need an account?
            </Link>
          </div>

          <Form className="flex flex-col justify-center items-center gap-3 m-5">
            <ul className=" text-orange-800 font-bold list-disc ">
              {err && <li> email or password is invalid</li>}
            </ul>
            <div className="sm:w-2/5 w-full">
              <Field
                type="email"
                name="email"
                id="text"
                className="block w-full p-2.5 border border-gray-400 rounded-md outline-none focus:ring-cornflower focus:border-cornflower mb-3"
                placeholder="Email"
              />

              <Field
                type="password"
                name="password"
                id="password"
                className="block w-full p-2.5 border border-gray-400 rounded-md outline-none focus:ring-cornflower focus:border-cornflower mb-3"
                placeholder="Password"
              />

              <button
                type="submit"
                className="btn bg-green hover:bg-emerald-600 py-3 px-5 rounded font-medium text-white float-right mb-3"
                disabled={isSubmitting}
              >
                Sign up
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
});

export default Signin;
