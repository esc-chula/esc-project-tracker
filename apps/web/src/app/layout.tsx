import "../styles/globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const sukhumvitSet = localFont({
  src: [
    {
      path: "../../public/fonts/SukhumvitSet-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/SukhumvitSet-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/SukhumvitSet-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SukhumvitSet-Text.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SukhumvitSet-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/SukhumvitSet-Thin.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--sukhumvit-set-font",
});

export const metadata = {
  title: "ESC Project Tracker",
  description: "ESC Project Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="x-icon" href="/icons/esc.svg" />
      </head>
      <body className={inter.className + " " + sukhumvitSet.className}>
        {children}
      </body>
    </html>
  );
}
