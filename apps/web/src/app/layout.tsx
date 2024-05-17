import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ESC Project Tracker",
  description: "ESC Project Tracker",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="x-icon" href="/icons/esc.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
