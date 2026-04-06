import { prisma } from "@/lib/prisma"
import ContactClient from "./ContactClient"

export default async function ContactPage() {
  const contactInfo = await prisma.contactInfo.findMany({
    orderBy: { id: "asc" },
  })

  return <ContactClient contactInfo={contactInfo} />
}
