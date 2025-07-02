import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "CrewDaily - Film Crew Hiring Platform | Book Professional Film & TV Crew",
  description:
    "Streamline your film crew hiring with CrewDaily. Connect with professional film and TV crew members across the UK for international productions, manage schedules, and book trusted crew. The modern crew hiring platform for UK-based and US productions filming in Britain.",
  keywords: [
    "film crew hiring",
    "crew booking platform",
    "film production crew",
    "TV crew hire",
    "daily crew booking",
    "film crew jobs",
    "crew hiring app",
    "production crew management",
    "freelance film crew",
    "crew daily platform",
    "film industry jobs",
    "crew scheduling software",
    "film crew network",
    "crew booking system",
    "production hiring platform",
  ].join(", "),
  openGraph: {
    title: "CrewDaily - Professional Film Crew Hiring Platform",
    description:
      "Connect with trusted film and TV crew members. Streamline crew booking and production management with CrewDaily's modern hiring platform.",
    url: "https://crewdaily.co.uk",
    siteName: "CrewDaily",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrewDaily - Film Crew Hiring Platform",
    description:
      "Book professional film & TV crew members with CrewDaily. Modern crew hiring for productions.",
    creator: "@crewdaily",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // <----- ADD LATER -----
  },
  alternates: {
    canonical: "https://crewdaily.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
