import { InputField } from "@/components/ui/Input";
import { Form, Formik } from "formik";
import { Send } from "lucide-react";
import React, { useState } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { form_inputFields } from "./contactData";

// Array of input field configurations

const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="bg-white rounded-2xl p-8 md:p-10 elegant-shadow">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Send Us a Message
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
            setFormSubmitted(true);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            touched,
            isSubmitting,
          }) => (
            <Form className="space-y-5">
              {formSubmitted ? (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                  <p className="font-medium">Thank you for your message!</p>
                  <p className="mt-1">
                    We have received your inquiry and will get back to you
                    shortly.
                  </p>
                </div>
              ) : null}
              {form_inputFields.map((field) => {
                const fieldName = field.name as keyof typeof values;

                return (
                  <InputField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    isMultiline={field.isMultiline}
                    value={values[fieldName]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched[fieldName]}
                    error={errors[fieldName]}
                  />
                );
              })}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                  isSubmitting
                    ? "bg-wine-800 cursor-not-allowed"
                    : "bg-wine-900 hover:bg-wine-800"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default ContactForm;
