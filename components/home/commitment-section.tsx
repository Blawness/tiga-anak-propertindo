import { siteConfig } from "@/lib/site-config";
import {
  Parallax,
  ParallaxImage,
  RevealGroup,
  RevealItem,
  ScrollText,
} from "@/components/motion";
import SectionHeading from "@/components/section-heading";

const STATEMENT =
  "Pendekatan prudent, transparan, dan patuh regulasi untuk memastikan setiap langkah pengembangan properti memiliki dasar yang kuat.";

export default function CommitmentSection() {
  return (
    <section className="section-y bg-paper">
      <div className="section-shell">
        <SectionHeading index="01" eyebrow="Komitmen inti kami" />

        <ScrollText
          text={STATEMENT}
          className="mt-10 max-w-[22ch] font-display text-[clamp(2.25rem,5.6vw,5.5rem)] font-light leading-[1.04] tracking-[-0.02em] md:mt-14"
        />

        <div className="mt-24 grid gap-14 md:mt-36 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <ParallaxImage
              src={siteConfig.images.building}
              alt="Fasad bata bergelombang dengan langit biru"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="aspect-[4/5]"
              strength={10}
            />
          </div>

          {/* Moves against the image for a sense of depth */}
          <Parallax distance={-140} className="self-end md:col-span-6 md:col-start-7">
            <RevealGroup as="ol" className="flex flex-col">
              {siteConfig.credibility.map((item, index) => (
                <RevealItem
                  as="li"
                  key={item.label}
                  className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-8 last:border-b md:grid-cols-[4.5rem_1fr] md:py-10"
                >
                  <span className="eyebrow pt-2 text-stone">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h3">{item.label}</h3>
                    <p className="text-ink/65">{item.value}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
