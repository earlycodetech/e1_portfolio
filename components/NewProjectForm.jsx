"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as Yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RiRefreshLine } from "react-icons/ri";

const NewProjectForm = () => {
  const { toast } = useToast();
  const [processing, setProccessing] = useState(false)

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

  const handleSubmit = async (values) => {
    try {
      // Updload File
      setProccessing(true);
      const ext = values.image.name.split(".").pop();
      const fileName = `project_image_${new Date().getTime()}.${ext}`;

      const storageRef = ref(storage, "uploads/" + fileName);
      await uploadBytes(storageRef, values.image);

      // Get Download URL
      const downloadUrl = await getDownloadURL(ref(storage, storageRef));

      // Create a new object to be stored
      const project = {
        title: values.title,
        link: values.link,
        description: values.description,
        deployDate: values.deployDate,
        status: values.status,
        fileName: fileName,
        fileUrl: downloadUrl,
      };

      // Document reference for firestore
      const docRef = collection(db, "projects");
      await addDoc(docRef, project);
      toast({
        title: "Project Created",
        description: "Your project has been created.",
      });

      resetForm();
    } catch (error) {
      alert(error);
      console.error(error);
    }
    finally {
      setSubmitting(false)
    }
  };
  return (
    <div className="w-full max-w-[50rem] mx-auto bg-white p-5">
      <Formik
        initialValues={{
          title: "",
          link: "",
          description: "",
          image: null,
          deployDate: "",
          status: "dev",
        }}
        validationSchema={formValidation}
        onSubmit={handleSubmit}
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
                name="description"
                component={"p"}
                className="text-red-600 text-sm font-bold"
              />
            </div>

            <div className="text-center col-span-2 flex justify-center">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-orange-500 py-1 px-5 rounded-lg flex justify-center gap-3 text-white items-center"
              >
                Submit

                {isSubmitting && <RiRefreshLine className="animate-spin" /> }
                
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProjectForm;
