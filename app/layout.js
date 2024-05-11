import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"] , weight: ['100', '600', '900'] });

export const metadata = {
  title: "My Portfolio - Delivering Solutions",
  description: "Hi, my name is Earlycode and I am a web developer",
  favicon: "/logo.png"
};
// TODO: Check favicon
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
