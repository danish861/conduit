import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { deleteComment, getComments, postComments } from "../../APIs/article";

import { Formik, Form, Field } from "formik";
import authStore from "../../store/AuthStore";
import moment from "moment";
import Link from "next/link";

import { RiDeleteBin5Line } from "react-icons/ri";
import { colors } from "@mui/joy";

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
  id: number;
}

const Comments = () => {
  const { query } = useRouter();
  const slug = query.slug;

  const [commentsData, setCommentsData] = useState<IComments[]>([]);

  // console.log(commentsData);
  // previously done in this way
  // const { data, error } = useSWR(
  //   slug ? `articles/${slug}/comments` : null,
  //   slug ? (url) => getComments(url) : null
  // );
  // const comments: IComments[] = data.comments;

  useEffect(() => {
    const comments = async () => {
      const response = await getComments(`articles/${slug}/comments`);
      const comments = response.comments;

      setCommentsData(comments);
    };

    comments();
  }, [slug]);

  const deleteHandler = async (id: number) => {
    // console.log(id);
    await deleteComment(`/articles/${slug}/comments/${id}`);
    setCommentsData(commentsData.filter((comments) => comments.id !== id));
  };

  return (
    <>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values: FormValues, { setSubmitting, resetForm }) => {
          // submit the form

          postComments(`articles/${slug}/comments`, {
            comment: {
              body: values.message,
            },
          })
            .then((data) => setCommentsData([data.comment, ...commentsData]))
            .catch((error) => console.log(error));
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="border">
              <Field
                name="message"
                component="textarea"
                placeholder="Write a comments..."
                className=" block w-full h-32 p-3 outline-none  rounded-md "
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
                  disabled={isSubmitting}
                >
                  Post Commnet
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {commentsData?.map((comment) => {
        return (
          <>
            <div className="border  mt-4" key={comment.id}>
              <div>
                <p className="p-5">{comment.body}</p>
              </div>
              <div className="flex justify-between  border-t  p-3  bg-gray-100 items-center ">
                <div className="flex gap-2  ">
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

                {comment.author.username === authStore.username ? (
                  <button
                    className="mr-4"
                    onClick={() => deleteHandler(comment.id)}
                  >
                    {" "}
                    <RiDeleteBin5Line className="  text-gray-600  hover:text-gray-900" />
                  </button>
                ) : null}
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Comments;
