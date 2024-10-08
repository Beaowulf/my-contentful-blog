import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} backgroundColor`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
