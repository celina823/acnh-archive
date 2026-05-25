import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "ACNH Archive",
  description: "Animal Crossing: New Horizons archive project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
