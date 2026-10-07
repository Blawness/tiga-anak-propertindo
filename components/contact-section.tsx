import { siteConfig } from "@/lib/site-config";
import ContactCard from "./contact-card";
import SectionHeading from "./section-heading";

type ContactSectionProps = {
  index?: string;
  title?: string;
  description?: string;
  note?: string;
};

/** Closing contact section shared by every page. */
export default function ContactSection({
  index,
  title = "Silakan hubungi kami untuk percakapan awal.",
  description,
  note = "Respons akan diberikan secara terjadwal untuk menjaga kualitas diskusi.",
}: ContactSectionProps) {
  return (
    <section className="section-y bg-paper">
      <div className="section-shell grid gap-14 lg:grid-cols-12 lg:gap-8">
        <SectionHeading
          index={index}
          eyebrow="Kontak"
          title={title}
          description={description}
          className="lg:col-span-6"
        />
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-14">
          <ContactCard
            title="Saluran resmi"
            email={siteConfig.contact.email}
            whatsapp={siteConfig.contact.whatsapp}
            description={note}
          />
        </div>
      </div>
    </section>
  );
}
