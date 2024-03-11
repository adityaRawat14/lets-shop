"use client"
import { SessionProvider } from "next-auth/react"
import './globals.css'
import { Session } from "next-auth";
export default function RootLayout({
  children,session
}: Readonly<{
  children: React.ReactNode,session:Session;
}>) {
  return (
    <html lang="en">

      <body>
        <SessionProvider session={session}>
        {children}
        </SessionProvider>
        </body>
    </html>
  );
}
