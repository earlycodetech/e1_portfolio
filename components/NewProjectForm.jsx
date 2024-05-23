"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewProjectForm = () => {
  return (
    <div className="w-full max-w-[50rem] mx-auto bg-white p-5">
      <Formik
        initialValues={{
          title: "",
          link: "",
          description: "",
          image: "",
          deployDate: "",
          status: "dev",
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="gap-5 md:grid-cols-2 grid my-5">
            <div className="mb-3">
              <Field
                name="title"
                placeholder="Title"
                className="border  shadow-md focus:shadow-lg  bg-white outline-none w-full text-lg p-2 rounded-lg"
              />
              <ErrorMessage
                name="title"
                component={"p"}
                className="text-red-600 text-sm font-bold"
              />
            </div>
            <div className="mb-3">
              <Field
                name="link"
                placeholder="Project Link"
                className="border  shadow-md focus:shadow-lg  bg-white outline-none w-full text-lg p-2 rounded-lg"
              />
              <ErrorMessage
                name="link"
                component={"p"}
                className="text-red-600 text-sm font-bold"
              />
            </div>
            <div className="mb-3">
              <input
                type={"file"}
                onChange={(event) =>
                  setFieldValue("image", event.target.files[0])
                }
                className="border  shadow-md focus:shadow-lg  bg-white outline-none w-full text-lg p-2 rounded-lg"
              />
              <ErrorMessage
                name="image"
                component={"p"}
                className="text-red-600 text-sm font-bold"
              />
            </div>
            <div className="mb-3">
              <Field
                type="date"
                name="deployDate"
                placeholder="Deployment Date"
                className="border  shadow-md focus:shadow-lg  bg-white outline-none w-full text-lg p-2 rounded-lg"
              />
              <ErrorMessage
                name="deployDate"
                component={"p"}
                className="text-red-600 text-sm font-bold"
              />
            </div>
            <div className="mb-3">
              <Field
                name="status"
                as="select"
                className="border  shadow-md focus:shadow-lg  bg-white outline-none w-full text-lg p-2 rounded-lg"
              >
                <option value="live">Live</option>
                <option value="dev">Dev</option>
              </Field>
              <ErrorMessage
                name="deployDate"
                component={"p"}
                className="text-red-600 text-sm font-bold"
              />
            </div>
            <div className="mb-3 col-span-2">
              <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={(event) => {
                  console.log(event);
                }}
              />
              <ErrorMessage
                name="deployDate"
                component={"p"}
                className="text-red-600 text-sm font-bold"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProjectForm;
