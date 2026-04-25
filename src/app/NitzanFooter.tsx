"use client";

import Image from "next/image";
import { nitzanProfile } from "@/data/nitzan-projects";

const socialIcons = [
  { key: "linkedin", url: nitzanProfile.social.linkedin, icon: "/assets/images/linkedin-icon.png", alt: "LinkedIn" },
  { key: "github", url: nitzanProfile.social.github, icon: "/assets/images/github-icon.png", alt: "GitHub" },
  { key: "youtube", url: nitzanProfile.social.youtube, icon: "/assets/images/youtube-icon.png", alt: "YouTube" },
  { key: "vimeo", url: nitzanProfile.social.vimeo, icon: "/assets/images/vimeo-icon.png", alt: "Vimeo" },
  { key: "instagram", url: nitzanProfile.social.instagram, icon: "/assets/images/instagram-icon.png", alt: "Instagram" },
];

export default function NitzanFooter({
  contentClassName,
}: {
  /** Override the default inner padding. Used by pages (e.g. /about) whose
   *  section above the footer uses a different inset pattern — pass the
   *  same responsive padding to make the footer edges align with it. */
  contentClassName?: string;
} = {}) {
  return (
    <section className="pt-8 pb-10 md:pt-10 md:pb-12">
      <div className={contentClassName ?? "w-full px-6 md:px-10 lg:px-16"}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <p className="text-brand-muted mb-4 text-base md:text-lg font-medium tracking-widest">
              Please feel free to reach out at
            </p>
            <a
              href={`mailto:${nitzanProfile.email}`}
              className="text-brand-text text-2xl font-light tracking-tight underline underline-offset-4 decoration-brand-border hover:decoration-brand-text transition-colors duration-300 md:text-3xl"
            >
              {nitzanProfile.email}
            </a>
          </div>
          <div className="flex items-center gap-6 md:justify-end md:pt-8">
            {socialIcons.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-100 hover:opacity-60 transition-opacity duration-300"
              >
                <Image
                  src={s.icon}
                  alt={s.alt}
                  width={56}
                  height={35}
                  className="h-[35px] w-auto brightness-0"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
