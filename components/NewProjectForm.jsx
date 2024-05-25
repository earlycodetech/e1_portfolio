"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Yup from "yup";
import { useToast } from "@/components/ui/use-toast"


const NewProjectForm = () => {

  const { toast } = useToast()


  const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];
  const ALLOWED_FILE_SIZE = 5 * 1024 * 1024; //5mb

  const formValidation = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    link: Yup.string().required("Link is required").url("Link must be a url"),
    description: Yup.string().required("Description is required"),
    deployDate: Yup.string().required("Deployed Date is required"),
    status: Yup.string()
      .required("Status is required")
      .oneOf(["live", "dev"], "Invalid Status"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileFormat",
        "Invalid file type, allowed types: jpeg, jpg, png, gif",
        (value) => value && ALLOWED_FILE_TYPES.includes(value.type)
      )
      .test(
        "fileSize",
        "Invalid file size, max: 5mb",
        (value) => value && value.size <= ALLOWED_FILE_SIZE
      ),
  });


  const handleSubmit = (values) => {
    alert(JSON.stringify(values))
    toast({
      title: "Project Created",
      description: "Your project has been created.",
    })
  }
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
        validationSchema={formValidation}
        onSubmit={(values) => {handleSubmit(values)}}
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
                onChange={(event, editor) => {
                  setFieldValue("description", editor.getData());
                }}
              />
              <ErrorMessage
                name="deployDate"
                component={"p"}
                className="text-red-600 text-sm font-bold"
              />
            </div>

            <div className="text-center col-span-2">
              <button
                disabled={isSubmitting}
                className="bg-orange-500 py-1 px-5 rounded-lg"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProjectForm;
