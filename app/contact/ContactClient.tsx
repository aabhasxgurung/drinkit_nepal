"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { PAGE_STYLES } from "./contactData";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ContactInfo } from "@prisma/client";

const ICON_BY_TYPE: Record<string, React.ReactNode> = {
  address: <MapPin className="h-5 w-5 text-wine-900" />,
  email: <Mail className="h-5 w-5 text-wine-900" />,
  phone: <Phone className="h-5 w-5 text-wine-900" />,
};

export default function ContactClient({
  contactInfo,
}: {
  contactInfo: ContactInfo[];
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden bg-[#F5EBDA]">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/home/footerbg.png"
            fill
            alt="Cocktails background"
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-black mb-4">
              Get In Touch
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto px-4 font-sans">
              We&apos;d love to hear from you. Whether you have a question about
              our products, partnership opportunities, or anything else, our
              team is ready to answer all your inquiries.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info + Form */}
      <section className={PAGE_STYLES.sectionPadding}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <h2 className={PAGE_STYLES.headingText}>
                  Contact Information
                </h2>
                <p className={PAGE_STYLES.paragraphText}>
                  Our dedicated team is here to assist you with any inquiries
                  regarding our premium liquor selection, distribution services,
                  or partnership opportunities.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.id} className={PAGE_STYLES.contactItem}>
                      <div className={PAGE_STYLES.iconWrapper}>
                        {ICON_BY_TYPE[info.type] ?? (
                          <MapPin className="h-5 w-5 text-wine-900" />
                        )}
                      </div>
                      <div>
                        <h3 className={PAGE_STYLES.textContainer}>
                          {info.title}
                        </h3>
                        <p className={PAGE_STYLES.contentText}>
                          {info.value}
                          {info.subValue && (
                            <>
                              <br />
                              {info.subValue}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
