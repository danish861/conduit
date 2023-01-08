import { Formik, Form, Field } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { postArticle } from "../../api/article";

const NewArticlePage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Editor --Conduit</title>
      </Head>
      <Formik
        initialValues={{
          title: "",
          body: "",
          description: "",
          tagList: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const tag = values.tagList.split(" ");
          console.log(tag);
          // const tagList = values.tagList.split("\n");
          console.log("######## ARTICLE VALUES", values);

          postArticle("/articles", {
            article: {
              title: values.title,
              body: values.body,
              description: values.description,
              tagList: tag,
            },
          })
            .then((data) => {
              if (data.article) {
                router.push(`/article/${data.article.slug}`);
              }
            })
            .catch((error) => console.log(error));
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col justify-center items-center  gap-4 mt-10 ">
            <div className=" md:w-2/3 w-full  p-3 ">
              <Field
                type="text"
                name="title"
                placeholder="Article Title"
                className=" block w-full  p-2.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
              />
              <Field
                type="text"
                name="body"
                placeholder="What's this article about"
                className=" block w-full  p-1.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
              />
              <Field
                component="textarea"
                name="description"
                placeholder="Write your article (in markdown)"
                className=" block w-full h-36  border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
              />

              <Field
                type="text"
                name="tagList"
                value={values.tagList}
                placeholder="Enter tags"
                className=" block w-full  p-1.5 border border-gray-400 rounded-md  outline-none  focus:ring-cornflower focus:border-cornflower mb-3"
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
    </>
  );
};

export default NewArticlePage;

// disabled={isSubmitting}

{
  /* <hr className=" h-px bg-gray-400 md; border-0 dark:bg-gray-700  md:w-2/5 w-full" />
            <br className="mb-20" /> */
}
