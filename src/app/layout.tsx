import type { Metadata } from "next";
import { Geist} from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthProvider } from '../components/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Job2Door - Job Platform",
  description: "Find your next opportunity and get your Dream job . Job2Door - A Smarter, Simpler, Open Source Job Search Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <AuthProvider>
          <Navbar />
          <LoadingSpinner />
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
