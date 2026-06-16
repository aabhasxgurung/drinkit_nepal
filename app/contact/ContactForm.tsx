import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { form_inputFields } from "./contactData";

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

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }
  };

  const fieldBase =
    "w-full bg-transparent border-b border-[#E8E3DC] py-3 font-mono text-[13px] text-[#1C1814] placeholder:text-[#C4BBB0] focus:outline-none focus:border-[#1C1814] transition-colors duration-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10">
        Send a Message
      </p>
      <h2
        className="font-playfair italic text-[#1C1814] leading-[1.05] mb-12"
        style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
      >
        Drop us
        <br />
        <span style={{ color: "#7B0323" }}>a line.</span>
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await handleSubmit(values);
            setFormSubmitted(true);
            resetForm();
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
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
          <Form className="space-y-8">
            {formSubmitted ? (
              <div className="border-t border-b border-[#69B578]/40 py-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#69B578] mb-2">
                  Message Received
                </p>
                <p className="font-mono text-[11px] text-[#9A8F84] leading-[1.95]">
                  Thank you for reaching out — we&apos;ll get back to you
                  shortly.
                </p>
              </div>
            ) : null}

            {form_inputFields.map((field) => {
              const fieldName = field.name as keyof typeof values;
              const hasError = touched[fieldName] && errors[fieldName];

              return (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block font-mono text-[9px] uppercase tracking-[0.18em] text-[#9A8F84] mb-3"
                  >
                    {field.label}
                  </label>

                  {field.isMultiline ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      rows={4}
                      value={values[fieldName]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      className={`${fieldBase} resize-none`}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={values[fieldName]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      className={fieldBase}
                    />
                  )}

                  {hasError && (
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#7B0323] mt-2">
                      {errors[fieldName]}
                    </p>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-3 bg-[#1C1814] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5] hover:bg-[#2C2018] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending…" : "Send Message"}
              {!isSubmitting && <span>→</span>}
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default ContactForm;
