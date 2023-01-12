import { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { observer } from "mobx-react";

import Link from "next/link";
import { useRouter } from "next/router";

import authStore from "../../store/AuthStore";

interface MyFormValues {
  username: string;
  email: string;
  password: string;
}

const Signup = observer(() => {
  const [err, setErr] = useState("");
  const router = useRouter();

  return (
    <>
      <div className="text-center  m-4  ">
        <h1 className="text-3xl text-zinc-700">Sign up</h1>
        <Link href="/login" className="text-green hover:underline">
          Have an account?
        </Link>
      </div>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(
          values: MyFormValues,
          { setSubmitting }: FormikHelpers<MyFormValues>
        ) => {
          authStore
            .postSignUpUsers("/users", {
              user: {
                username: values.username,
                email: values.email,
                password: values.password,
              },
            })
            .then((data) => {
              if (data.user) {
                router.push("/");
              }

              if (
                data.response?.data.errors.username &&
                data.response.data.errors.email
              ) {
                setErr("username and email have already been taken ");
              } else if (data.response.data.errors.email) {
                setErr("email has already been taken ");
              } else if (data.response.data.errors.username) {
                setErr("username has already been taken ");
              }
            })
            .catch((error) => console.log(error));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center  items-center gap-3 m-5">
            <ul className=" text-orange-800 font-bold list-disc">
              {err && <li>{err}</li>}
            </ul>
            <div className=" sm:w-2/5 w-full    ">
              <Field
                type="text"
                id="text"
                name="username"
                className=" block w-full  p-2.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3 "
                placeholder="Username"
                required
              />

              <Field
                type="email"
                id="text"
                name="email"
                className=" block w-full  p-2.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
                placeholder="Email"
                required
              />

              <Field
                type="password"
                id="password"
                name="password"
                className=" block w-full  p-2.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
                placeholder="Password"
                required
              />

              <button
                type="submit"
                className=" btn bg-green  hover:bg-emerald-600 py-3 px-5 rounded font-medium text-white  float-right mb-3"
                disabled={isSubmitting}
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
});

export default Signup;
