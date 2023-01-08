import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getArticle, updateArticle } from "../../api/article";

const NewArticlePage = () => {
  const router = useRouter();

  const slug = router.query.slug;
  // console.log(slug);
  // if(slug!== )

  const { data, error } = useSWR(
    slug ? `articles/${slug}` : null,
    slug ? (url) => getArticle(url) : null
  );

  if (error) {
    router.push("/"); //     QUESTION
  }

  console.log(error);
  if (!data) {
    return;
  }
  const { title, body, description } = data.article;

  return (
    <Formik
      initialValues={{
        title: title,
        body: body,
        description: description,
        tagList: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        // const tag = values.tagList.split(" ");
        // console.log(tag);
        // // const tagList = values.tagList.split("\n");
        // console.log("######## ARTICLE VALUES", values);

        updateArticle(`articles/${slug}`, {
          article: {
            title: values.title,
            body: values.body,
            description: values.description,
          },
        })
          .then((data) => {
            if (data.article) {
              router.push(`article/${slug}`); //   QUESTION, NEED TO ASK
            }
          })
          .catch((error) => console.log(error));
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col justify-center items-center  gap-4 mt-10 ">
          <div className=" md:w-2/3 w-full  p-3 ">
            <Field
              type="text"
              name="title"
              placeholder="Article Title"
              className=" text-slate-600 text-xl block w-full  p-2.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
            />
            <Field
              type="text"
              name="body"
              placeholder="What's this article about"
              className=" text-slate-600 block w-full  p-1.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
            />
            <Field
              component="textarea"
              name="description"
              placeholder="Write your article (in markdown)"
              className="text-slate-600 p-4 block w-full h-36  border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
            />

            <Field
              type="text"
              name="tagList"
              placeholder="Enter tags"
              className="text-slate-600 block w-full  p-1.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
            />

            <button
              type="submit"
              className=" btn bg-green  hover:bg-emerald-600 py-3 px-6 rounded font-medium text-white  float-right mb-3 "
            >
              Publish Article
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewArticlePage;

// disabled={isSubmitting}

{
  /* <hr className=" h-px bg-gray-400 md; border-0 dark:bg-gray-700  md:w-2/5 w-full" />
            <br className="mb-20" /> */
}
