import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeroLibrary | The Trust-First Academic Marketplace",
  description: "Join the exclusive waitlist for FeroLibrary. Access verified past questions, study guides, and project templates for University and Secondary students. Build your academic reputation and monetize your knowledge as an Educator.",
  keywords: ["FeroLibrary", "Academic Resources", "Past Questions", "JAMB", "WAEC", "University Notes", "Verified Study Guides"],
  openGraph: {
    title: "FeroLibrary | The Trust-First Academic Marketplace",
    description: "Join the exclusive waitlist for FeroLibrary. Access verified past questions, study guides, and project templates. Guaranteed accuracy.",
    url: "https://ferolibrary.com",
    siteName: "FeroLibrary",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "FeroLibrary Hero Graphic",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FeroLibrary | The Trust-First Academic Marketplace",
    description: "Join the exclusive waitlist for FeroLibrary. Access verified past questions, study guides, and project templates. Guaranteed accuracy.",
    images: ["/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`min-h-screen antialiased dark`}>
      <body className="min-h-screen flex flex-col bg-gradient-mesh text-white">
        {children}
      </body>
    </html>
  );
}
