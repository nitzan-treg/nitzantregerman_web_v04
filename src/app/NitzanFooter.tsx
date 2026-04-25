"use client";

import Image from "next/image";
import { nitzanProfile } from "@/data/nitzan-projects";

const socialIcons = [
  { key: "linkedin", url: nitzanProfile.social.linkedin, icon: "/assets/images/social/linkedin.png", alt: "LinkedIn" },
  { key: "github", url: nitzanProfile.social.github, icon: "/assets/images/social/github.png", alt: "GitHub" },
  { key: "youtube", url: nitzanProfile.social.youtube, icon: "/assets/images/social/youtube.png", alt: "YouTube" },
  { key: "vimeo", url: nitzanProfile.social.vimeo, icon: "/assets/images/social/vimeo.png", alt: "Vimeo" },
  { key: "instagram", url: nitzanProfile.social.instagram, icon: "/assets/images/social/instagram.png", alt: "Instagram" },
];

export default function NitzanFooter() {
  return (
    <section className="pt-8 pb-10 md:pt-10 md:pb-12">
      <div className="w-full px-6 md:px-10 lg:px-16">
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
                className="opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={s.icon}
                  alt={s.alt}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
