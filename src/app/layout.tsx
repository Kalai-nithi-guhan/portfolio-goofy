import type { Metadata, Viewport } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "./fonts";
import { MotionProvider } from "@/components/motion-provider";
import { RESUME_DATA } from "@/data/resume";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0B0B12",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} | Aspiring AI/ML Engineer`,
  description: `${RESUME_DATA.name} - ${RESUME_DATA.tagline}. ${RESUME_DATA.stats.leetcodeSolved}+ LeetCode DSA solutions, Llama 3.1 agents, Contextual RAG, and Computer Vision.`,
  metadataBase: new URL("https://kalainithiguhan.dev"),
  keywords: [
    "Kalai Nithi Guhan M",
    "AI Engineer",
    "Machine Learning",
    "RAG",
    "Computer Vision",
    "MediaPipe",
    "Next.js",
    `LeetCode ${RESUME_DATA.stats.leetcodeSolved}+`,
  ],
  authors: [{ name: RESUME_DATA.name, url: RESUME_DATA.socials.github }],
  openGraph: {
    title: `${RESUME_DATA.name} | KalaiOS Retro-Futuristic Portfolio`,
    description: RESUME_DATA.tagline,
    url: "https://kalainithiguhan.dev",
    siteName: "KalaiOS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: RESUME_DATA.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} | Aspiring AI/ML Engineer`,
    description: RESUME_DATA.tagline,
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/bugsy.svg",
    apple: "/bugsy.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: RESUME_DATA.name,
    jobTitle: "Aspiring AI/ML Engineer",
    email: RESUME_DATA.email,
    telephone: RESUME_DATA.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pollachi",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Dr. Mahalingam College of Engineering and Technology",
    },
    sameAs: [
      RESUME_DATA.socials.github,
      RESUME_DATA.socials.linkedin,
      RESUME_DATA.socials.leetcode,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Retrieval Augmented Generation",
      "Computer Vision",
      "Data Structures & Algorithms",
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--os-bg)] text-[var(--os-text)] selection:bg-[var(--os-accent)] selection:text-black">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
