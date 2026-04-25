// Nitzan Tregerman personal portfolio — rebuilt with Qavim UI/animations
// All text verbatim from nitzantregerman.com (Rebranded 2026)

export type NitzanProjectCategory =
  | "showreel"
  | "vfx-commercial"
  | "open-source"
  | "community"
  | "projection";

export type NitzanProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: NitzanProjectCategory;
  /** Full multi-paragraph description from original site */
  description: string[];
  tools: string[];
  credits: { role: string; name: string }[];
  thumbnail: string;
  /** Looping video used as card thumbnail on homepage (replaces static image) */
  thumbnailVideo?: string;
  images: string[];
  /** Main playable video with controls (top of project page) */
  heroVideo?: string;
  /** Additional local mp4 loop videos (background autoplay in gallery) */
  videos?: string[];
  vimeoId?: string;
  vimeoIds?: string[];
  /** YouTube video ID for embedded player */
  youtubeId?: string;
  /** Optional start time in seconds for the YouTube embed */
  youtubeStart?: number;
  featured: boolean;
  sortOrder: number;
  agency?: string;
  links?: { label: string; url: string }[];
  features?: { name: string; description: string }[];
  behindTheScenes?: string[];
};

const img = (name: string) =>
  `/assets/images/${name}`;

const vid = (name: string) =>
  `/assets/videos/${name}`;

export const nitzanProfile = {
  name: "Nitzan Tregerman",
  headline: "Hey, I'm Nitzan",
  tagline:
    "A motion designer and compositor creating 3D animation with Houdini, Blender, and After Effects.",
  bio: "I'm a freelance 3D animator, motion graphics and Visual effects artist. With 5 years of experience in the industry, I began my career in working on post-production commercials for clients such as Pelephone, Yes, Cellcom, Partner.",
  expertise:
    "My expertise lies in SideFX Houdini, Blender and After Effects, with a focus on VEX programming, SOP level procedural setups, particle and fluid simulations. I'm also skilled in, Davinci Resolve, Photoshop, Illustrator and Premier.",
  philosophy:
    "My inspiration comes from blending the worlds of math and art, I enjoy blending interesting shapes and forms with stylized design to create captivating and distinctive work.",
  personal:
    "Outside of work, I am a big chess fan, a dog lover and a true hiking addict.",
  contactCta:
    "If you're interested in collaborating or hiring me for a project, please don't hesitate to get in touch.",
  tools: [
    "SideFX Houdini",
    "Blender",
    "After Effects",
    "DaVinci Resolve",
    "Photoshop",
    "Illustrator",
    "Premiere Pro",
  ],
  email: "nitzan@nitzantregerman.com",
  social: {
    linkedin: "https://linkedin.com/in/nitzan-tregerman-72699b16a/",
    github: "https://github.com/nitzan-treg",
    youtube: "https://youtube.com/@nitzantregerman",
    vimeo: "https://vimeo.com/user105531305",
    instagram: "https://instagram.com/treger_man/",
  },
  portraits: [img("nitzan-portrait-01.webp"), img("nitzan-portrait-02.webp")],
  logo: img("nitzan-logo.png"),
  aboutVideo: vid("about-video.mp4"),
  heroVideo: vid("hero-intro.mp4"),
  showreelTease: vid("showreel-tease.mp4"),
};

export const nitzanProjects: NitzanProject[] = [
  {
    slug: "showreel-2025",
    title: "Showreel 2025",
    subtitle: "Showreel & R&D compilation",
    category: "showreel",
    description: [
      "A big thanks to the friendly, talented bunch of people & teams I have worked with on these projects. I'm very grateful to get to do what I do.",
      "Research & Development Reel",
    ],
    tools: ["Houdini", "Blender", "After Effects", "Redshift"],
    credits: [],
    thumbnail: img("showreel-poster.jpg"),
    thumbnailVideo: vid("showreel-tease.mp4"),
    images: [img("showreel-poster.jpg")],
    heroVideo: vid("showreel-tease.mp4"),
    vimeoId: "1094702027",
    vimeoIds: ["1094702027", "927136615"],
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "ntlib",
    title: "ntLib",
    subtitle: "Open-source Houdini HDA library",
    category: "open-source",
    description: [
      "ntLib is an open-source library of Houdini HDA's designed for simulating dynamics and procedural generation.",
      "It's available for free on GitHub, where you can download, study, and even reverse engineer the HDA's to your heart's content. You're warmly invited to become part of our community on Discord and Github.",
    ],
    tools: ["SideFX Houdini", "VEX", "After Effects"],
    credits: [{ role: "Developer", name: "Nitzan Tregerman" }],
    thumbnail: img("infection-solver-poster.jpg"),
    thumbnailVideo: vid("ntlib-infection-thumb.mp4"),
    images: [
      img("infection-solver-poster.jpg"),
      img("ntlib-smoke-solver-poster.jpg"),
      img("ntlib-smoke-solver2-poster.jpg"),
      img("ntlib-chlandi-poster.jpg"),
      img("ntlib-velocity-poster.jpg"),
      img("ntlib-assemble-poster.jpg"),
    ],
    videos: [
      vid("ntlib-extrude-main.mp4"),
      vid("ntlib-extrude-compressed.mp4"),
      vid("ntlib-extrude3.mp4"),
      vid("ntlib-velocity.mp4"),
      vid("ntlib-smoke-solver.mp4"),
      vid("ntlib-smoke-solver2.mp4"),
      vid("ntlib-chladni.mp4"),
      vid("ntlib-chladni2.mp4"),
      vid("ntlib-chladni3.mp4"),
      vid("ntlib-assemble.mp4"),
      vid("ntlib-infection.mp4"),
      vid("ntlib-infection-texture.mp4"),
    ],
    featured: true,
    sortOrder: 2,
    links: [
      { label: "Join on GitHub", url: "https://github.com/nitzan-treg/ntLib" },
      { label: "Chat on Discord", url: "https://discord.gg/CKwdngysht" },
    ],
    features: [
      {
        name: "Extrude Subdivision",
        description:
          "This node takes an input polygon surface, subdividing each face to form an 'Extruded' shape, enhancing areas of local detail without compromising on complexity.",
      },
      {
        name: "2D Smoke Solver",
        description:
          "A SOP solver that efficiently simulates smoke on a 2D plane. This method allows for efficient high-resolution simulations and the rendered output can be utilized as a dynamic texture for shading.",
      },
      {
        name: "3D Chlandi Noise",
        description:
          "This node generates a 3D Chlandi noise pattern that can be created as an attribute in the SOP context. Inspired by the article 'Chladni Figures Revisited: A Peek Into The Third Dimension'.",
      },
      {
        name: "Infection Solver",
        description:
          "This node offers a unique 'infection simulation' that spreads organically across the geometry, enabling the saving of infection data as a texture for further transformation by shaders or deformers.",
      },
    ],
  },
  {
    slug: "peres-academy",
    title: "Peres Academy",
    subtitle: "Doctor Strange portal VFX",
    category: "vfx-commercial",
    description: [
      "For the Peres Academy project, Broadcast Media TLV invited me to create a visual effect that mimics the style of Marvel's Doctor Strange portal.",
      "Using SideFX Houdini, I built several particle simulations and rendered them using Redshift, which was a key part of the project's visual effects.",
      "It was a rewarding experience working with the talented team at Broadcast Media TLV, including Roy Kafri as the creative director and Ivan Denisenko, the skilled compositor.",
      "We utilized a ring of light in a practical setup to enhance the main character with a luminescent effect from the portal emission, ensuring a seamless integration with the portal's illumination.",
      "Afterwards we created a clean plate and composited the main character inside the portal.",
      "As part of research and design i created multiple particle simulations to have a better creative control over the final result",
    ],
    tools: ["SideFX Houdini", "Redshift", "After Effects"],
    credits: [
      { role: "Creative Director", name: "Roy Kafri" },
      { role: "Compositor", name: "Ivan Denisenko" },
      { role: "VFX Artist", name: "Nitzan Tregerman" },
    ],
    agency: "Broadcast Media TLV",
    thumbnail: img("peres-titanik-poster.jpg"),
    thumbnailVideo: vid("peres-thumb.mp4"),
    images: [img("peres-titanik-poster.jpg"), img("peres-bts-poster.jpg")],
    heroVideo: vid("peres-breakdown.mp4"),
    youtubeId: "ux3W9YLKd60",
    youtubeStart: 1,
    videos: [vid("peres-breakdown.mp4"), vid("peres-bts.mp4")],
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "pelephone-5g",
    title: "Pelephone 5G",
    subtitle: "Stylized cell-world environment",
    category: "vfx-commercial",
    description: [
      "For the Pelephone 5G project, Broadcast Media TLV asked me to design a special environment with a stylized, cell-like look. I used SideFX Houdini to create crafted diverse elements including vegetation, planets, terrain and completed the scene with a final render in Redshift.",
      "I developed an in-house Houdini Digital Asset (HDA) to achieve the stylized cell-like design. We integrated Noa Kirel and Yehuda Levi into the scene through compositing, after filming them against a greenscreen.",
    ],
    tools: ["SideFX Houdini", "Redshift", "After Effects"],
    credits: [
      { role: "Director", name: "Rani Carmeli" },
      { role: "Creative Director", name: "Daria Belov" },
      { role: "3D Artists", name: "Golan Shviro, Itai Bachar" },
      { role: "Talent", name: "Noa Kirel, Yehuda Levi" },
    ],
    agency: "Broadcast Media TLV",
    thumbnail: img("pelephone-5g-thumb.jpg"),
    images: [
      img("pelephone-5g-01.jpg"),
      img("pelephone-5g-02.jpg"),
      img("pelephone-5g-thumb.jpg"),
      img("pelephone-bts-poster.jpg"),
    ],
    heroVideo: vid("pelephone-bts.mp4"),
    videos: [vid("pelephone-bts.mp4")],
    youtubeId: "ETMW2Kx845E",
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "cellcom-fiber",
    title: "Cellcom FiberTV",
    subtitle: "Interactive magical portal",
    category: "vfx-commercial",
    description: [
      "For the Cellcom FiberTV project, I was tasked with the creation of a magical purple portal. Under the creative direction of Daria Belov, we designed the portal to glow and have a lively feel.",
      "From a technical perspective, the portal needed to be interactive; it had to ripple and respond as the character moved through it. I accomplished this interactivity by implementing a Ripple solver coupled with custom VEX coding in SideFX Houdini. The shading and rendering phase was executed using Redshift. Finally, the sequences were sent to the compositing department for the finishing touches.",
    ],
    tools: ["SideFX Houdini", "Redshift", "VEX", "After Effects"],
    credits: [
      { role: "Director", name: "Uri Shitzer" },
      { role: "Creative Director", name: "Daria Belov" },
      { role: "VFX Artist", name: "Nitzan Tregerman" },
      { role: "3D Artists", name: "Roman Kanevsky, Itai Bachar" },
      { role: "Compositors", name: "Igor Mishchenko, Ivan Denisenko" },
    ],
    thumbnail: img("cellcom-poster.jpg"),
    thumbnailVideo: vid("cellcom-compressed3.mp4"),
    images: [
      img("cellcom-poster.jpg"),
      img("cellcom-compressed2-poster.jpg"),
      img("cellcom-compressed3-poster.jpg"),
    ],
    heroVideo: vid("cellcom-compressed3.mp4"),
    videos: [vid("cellcom-compressed3.mp4"), vid("cellcom-compressed2.mp4")],
    youtubeId: "8pETtQsLNoU",
    featured: true,
    sortOrder: 5,
  },
  {
    slug: "tlv-hug",
    title: "Tel Aviv Houdini Group",
    subtitle: "TLV HUG community meetups",
    category: "community",
    description: [
      "We're a community of 3D animators, motion designers, and VFX artists in Israel who meet 2\u20133 times a year to explore SideFX Houdini. Whether you're new or advanced, everyone's welcome to learn, share, and connect.",
      "We gather to share knowledge about Houdini \u2014 covering VEX, Vellum, advanced simulations, and real production workflows. It's a relaxed environment with pizza, drinks, and good company.",
      "Each meetup has its own unique look, designed entirely in Houdini. From swirling particles to fluid animations, I craft the visuals and handle the full production, ensuring a seamless experience for everyone.",
      "A big thanks to the friendly, talented bunch of people and teams who help this community thrive. Special Thanks to Roy Rosen, Yonatan Bary, Studio 3Sisters, Ariad Shiknagi, and IAC for their support behind the scenes.",
    ],
    tools: ["SideFX Houdini", "After Effects"],
    credits: [
      { role: "Organizer", name: "Nitzan Tregerman" },
      { role: "Collaborators", name: "Roy Rosen, Yonatan Bary" },
      { role: "Venue", name: "Studio 3Sisters, IAC" },
    ],
    thumbnail: img("tlv-hug-thumb.jpg"),
    images: [img("tlv-hug-photo.jpg"), img("artboard-1b.png")],
    videos: [
      vid("tlvhug-mix.mp4"),
      vid("tlvhug-people.mp4"),
      vid("tlvhug-art.mp4"),
    ],
    links: [
      { label: "Sign Up for the Next Meetup", url: "https://forms.gle/Czu1LCA5qNcUvK2z7" },
      { label: "Join our Discord Channel", url: "https://discord.gg/nW95eKFFW5" },
      { label: "Join our Whatsapp Group", url: "https://chat.whatsapp.com/Kx9rfAiJgQPACAqaaUMTqn" },
    ],
    featured: true,
    sortOrder: 6,
  },
  {
    slug: "partner-fiber",
    title: "Partner Fiber",
    subtitle: "Fiber trail visual effects",
    category: "vfx-commercial",
    description: [
      "For the Partner Fiber project, Broadcast Media TLV brought me in to create visual effects called Fiber Trails, symbolizing the company's high-speed internet service.",
      "The trails were crafted in the company's colors and made using custom tools I developed, allowing the creative director to shape the trails by drawing 3D curves. They were rendered with Redshift and composited in Adobe After Effects.",
    ],
    behindTheScenes: [
      "The \"Sweep Plus\" HDA (Houdini Digital Asset) enabled customization of trail characteristics including length, quantity, color, and motion. The approach utilized procedural methods without simulations, enabling real-time preview during development.",
    ],
    tools: ["SideFX Houdini", "Redshift", "After Effects"],
    credits: [
      { role: "Production", name: "POV" },
      { role: "Directors", name: "Shahar Segal, Gal Muja" },
      { role: "VFX", name: "Broadcast Media TLV" },
      { role: "VFX Artist", name: "Nitzan Tregerman" },
    ],
    agency: "McCann",
    thumbnail: img("partner-fiber-thumb.jpg"),
    images: [img("nitzan-intro-poster.jpg")],
    videos: [
      vid("partner-sweep-hda.mp4"),
      vid("partner-bts1.mp4"),
      vid("partner-bts2.mp4"),
      vid("partner-bts3.mp4"),
      vid("partner-bts4.mp4"),
    ],
    vimeoId: "927571378",
    featured: false,
    sortOrder: 7,
  },
  {
    slug: "whakatane",
    title: "Light Up Whakat\u0101ne",
    subtitle: "Projection mapping festival",
    category: "projection",
    description: [
      "At New Zealand's Light Up Whakat\u0101ne festival, I had the opportunity to design graphic animations for the main projector.",
      "These designs were born from my deep dive into 'polar coordinates' in Houdini, which allows for the warping of geometry in a way that creates distinctive, circular deformations.",
      "Working with Ben Foot was a joy; his complete creative trust enabled me to experiment with color and movement in tune with the project's rhythm.",
      "The fascinating 'polar deformation' effect comes from a mathematical idea used to pinpoint positions on a sphere, much like how GPS locates us on Earth.",
      "By applying this concept to geometry in Houdini, it resulted in shapes morphing into circular patterns. This abstract method led to stunning visual effects that were both novel and captivating.",
    ],
    tools: ["SideFX Houdini", "After Effects"],
    credits: [
      { role: "Animator", name: "Nitzan Tregerman" },
      { role: "Collaborator", name: "Ben Foot" },
    ],
    thumbnail: img("whakatane-lightup-og.jpg"),
    images: [img("whakatane-lightup-og.jpg"), img("whakatane-bts-still.jpg")],
    videos: [vid("whakatane-bts1.mp4"), vid("whakatane-bts2.mp4"), vid("whakatane-bts3.mp4")],
    vimeoId: "740868001",
    featured: false,
    sortOrder: 8,
  },
  {
    slug: "meshek-tzuriel",
    title: "Meshek Tzuriel",
    subtitle: "CG goat character & cloth simulation",
    category: "vfx-commercial",
    description: [
      "In the Meshek Tzuriel project, I was responsible for creating a CG goat that engages with the main character, notably in a scene where the goat chews and rips the character's shirt.",
      "The task involved two key stages: Grooming \u2014 I developed a procedural grooming setup to craft realistic fur across the goat's body, with ongoing revisions to meet the client's feedback. Cloth Tear \u2014 For the shirt-tearing scene, I created a Houdini Vellum simulation to depict the cloth tearing by the goat. After completing the VFX, I rendered the goat with Redshift.",
    ],
    tools: ["SideFX Houdini", "Vellum", "Redshift", "After Effects"],
    credits: [
      { role: "Creative Director", name: "Daria Belov" },
      { role: "VFX Artist", name: "Nitzan Tregerman" },
      { role: "3D Artist", name: "Itai Bachar" },
      { role: "Compositor", name: "Ivan Denisenko" },
    ],
    thumbnail: img("meshek-composited-poster.jpg"),
    images: [
      img("meshek-composited-poster.jpg"),
      img("meshek-goat-poster.jpg"),
      img("meshek-cloth-poster.jpg"),
    ],
    heroVideo: vid("meshek-composited.mp4"),
    videos: [
      vid("meshek-composited.mp4"),
      vid("meshek-goat.mp4"),
      vid("meshek-cloth.mp4"),
      vid("meshek-flipbook.mp4"),
    ],
    youtubeId: "VxpPhKuF5Uk",
    featured: false,
    sortOrder: 9,
  },
  {
    slug: "paz-charge",
    title: "Paz Charge",
    subtitle: "Character fur simulation",
    category: "vfx-commercial",
    description: [
      "For the Paz Charge project, I was tasked by 'Broadcast Media TLV' to create the dynamic fur for the vibrant character 'Bouncy,' set to become the face of the company. Our team collaboratively developed Bouncy's visual design.",
      "Following this, I created a procedural system within SideFX Houdini to simulate and render Bouncy's fur, which we then rendered using Redshift. Thanks to great teamwork, our compact team of three 3D artists was responsible for producing 20 shots within a demanding deadline.",
    ],
    tools: ["SideFX Houdini", "Redshift", "After Effects"],
    credits: [
      { role: "Animators", name: "Omri Fisher, Yonatan Gafni" },
      {
        role: "VFX & 3D",
        name: "Itai Bachar, Nitzan Tregerman, Michael Gofman",
      },
      {
        role: "Compositors",
        name: "Ivan Denisenko, Igor Torus, Dmitry Tselikov",
      },
    ],
    agency: "Broadcast Media TLV",
    thumbnail: img("paz-charge-01.webp"),
    images: [
      img("paz-charge-01.webp"),
      img("paz-charge-02.jpg"),
      img("paz-charge-03.jpg"),
      img("paz-charge-04.jpg"),
    ],
    youtubeId: "TNNErQtr8Ws",
    featured: false,
    sortOrder: 10,
  },
];

export const nitzanSkills = [
  { label: "VFX Commercials", desc: "Houdini FX, compositing, brand films" },
  { label: "Procedural Art", desc: "VEX, HDAs, simulations" },
  { label: "3D Animation", desc: "Motion design, character, environments" },
  { label: "Open Source", desc: "ntLib, community tools, TLV HUG" },
];

export const nitzanNav = [
  { label: "Work", href: "/" },
  { label: "Showreel", href: "/work/showreel-2025" },
  { label: "Community", href: "/work/tlv-hug" },
  { label: "About", href: "/about" },
];
