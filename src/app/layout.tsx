import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Euky Care | NDIS Registered Provider - Quality Disability Support Services",
  description: "Euky Care is an NDIS registered provider offering accommodation, support services, and community involvement for people with disabilities. Quality care you can trust.",
  keywords: ["NDIS", "disability support", "NDIS provider", "accommodation services", "support services", "community involvement", "disability care"],
  authors: [{ name: "Euky Care" }],
  icons: {
    icon: "/resources/brand_logo.png",
    apple: "/resources/brand_logo.png",
  },
  openGraph: {
    title: "Euky Care | NDIS Registered Provider",
    description: "Quality disability support services - Accommodation, Support Services, and Community Involvement",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/resources/brand_logo.png",
        width: 1200,
        height: 630,
        alt: "Euky Care Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Euky Care | NDIS Registered Provider",
    description: "Quality disability support services - Accommodation, Support Services, and Community Involvement",
    images: ["/resources/brand_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#6A2875" />
      </head>
      <body className={inter.className}>
        <Preloader />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
