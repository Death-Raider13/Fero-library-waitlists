import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeroLibrary | The Future of Academic Resources",
  description: "Join the waitlist for the most sophisticated, trust-first academic marketplace.",
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
