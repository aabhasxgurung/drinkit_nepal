import React from "react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputField } from "@/components/ui/Input";
import type { FormikHelpers } from "formik";

const SubscribeForm = () => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address"),
  });

  const handleSubmit = (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    console.log("Form submitted:", values);
    resetForm();
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Stay updated with our newest products, exclusive promotions, and
            expert mixology tips.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              handleBlur,
              handleChange,
              errors,
              touched,
              values,
            }) => (
              <Form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto w-full">
                <div className="w-full">
                  <InputField
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label=""
                    name="email"
                    placeholder="Enter your email"
                    error={errors.email}
                    touched={touched.email}
                    value={values.email}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-wine-900 text-white font-medium rounded-lg hover:bg-wine-800 transition-colors"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscribeForm;
