import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { getComments } from "../../api/article";

import { Formik, Form, Field } from "formik";
import authStore from "../../store/AuthStore";
import moment from "moment";
import Link from "next/link";

interface FormValues {
  message: string;
}

interface IComments {
  body: string;
  author: {
    image: string;
    username: string;
  };
  updatedAt: number;
}

const Comments = () => {
  const { query } = useRouter();
  const slug = query.slug;

  const { data, error } = useSWR(`articles/${slug}/comments`, (url) =>
    getComments(url)
  );

  if (!data) {
    return <div>Loading......</div>; // handle
  }
  const comments: IComments[] = data.comments;

  return (
    <>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values: FormValues) => {
          // submit the form
        }}
      >
        {() => (
          <Form>
            <div className="border">
              <Field
                name="message"
                component="textarea"
                placeholder="Write a comments..."
                className=" block w-full h-32 outline-none  rounded-md "
              />
              <div className="flex justify-between  border-t  p-3  bg-gray-100 items-center ">
                <img
                  src={authStore.image}
                  alt="user_image"
                  className="  rounded-full w-6 h-6 "
                />
                <button
                  type="submit"
                  className="btn bg-green text-sm  hover:bg-emerald-600 py-1 px-3 rounded  text-white font-bold  float-right  "
                >
                  Post Commnet
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {comments.map((comment) => {
        return (
          <>
            <div className="border  mt-4" key={comment.body}>
              <div>
                <p className="p-5">{comment.body}</p>
              </div>
              <div className=" bg-gray-100 border-y-0 p-3  flex gap-2  ">
                <img
                  src={comment.author.image}
                  alt="user_image"
                  className="  rounded-full w-6 h-6 "
                />
                <Link href={`/${comment.author.username}`}>
                  <p className="text-green text-sm hover:underline">
                    {comment.author.username}
                  </p>
                </Link>
                <span className="text-slate-300 text-sm">
                  {moment(comment.updatedAt).format("MMMM D, YYYY")}
                </span>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Comments;
