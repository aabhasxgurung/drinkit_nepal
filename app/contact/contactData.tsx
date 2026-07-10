import { Mail, MapPin, Phone } from "lucide-react";

export const CONTACT_INFO = {
  LOCATION: {
    title: "Our Location",
    content: <>Mandikhatar, Kathmandu</>,
    icon: <MapPin className="h-5 w-5 text-wine-900" />,
  },
  EMAIL: {
    title: "Email Us",
    content: <>Drinkitimportandexport@gmail.com</>,
    icon: <Mail className="h-5 w-5 text-wine-900" />,
  },
  PHONE: {
    title: "Call Us",
    content: (
      <>
        +977 9801359489
        <br />
        Mon–Fri from 9am to 6pm
      </>
    ),
    icon: <Phone className="h-5 w-5 text-wine-900" />,
  },
};

export const PAGE_STYLES = {
  sectionPadding: "py-16 md:py-24",
  headingText: "text-2xl font-semibold text-gray-900 mb-6",
  paragraphText: "text-gray-600 mb-10 font-sans",
  contactItem: "flex items-start space-x-4 font-sans",
  iconWrapper: "mt-1 bg-wine-50 p-3 rounded-full",
  textContainer: "text-lg font-medium text-gray-900",
  contentText: "text-gray-600 mt-1",
  mapWrapper: "h-80 w-full rounded-xl overflow-hidden elegant-shadow",
};

export const form_inputFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "your.email@example.com",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "How can we help you?",
  },
  {
    name: "message",
    label: "Message",
    isMultiline: true,
    placeholder: "Tell us about your inquiry...",
  },
];
