import "@/app/_styles/globals.css";
import { Outfit } from "@next/font/google";
import type { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"], // Specify the subsets you need
  weight: ["400", "500", "600", "700"], // You can specify the weights you want to include
});
export const metadata: Metadata = {
  title: {
    template: "%s | Taaskly booking",
    default: "Welcome / Taaskly booking",
  },
  description:
    "Booking simplified, create personalized booking pages, manage appointments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-secondary-400 ${outfit.className}`}>
        {children}
        {/* <Home>

        </Home> */}
      </body>
    </html>
  );
}
