import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import GlobalContextProvider from "@/ContextApi";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnippetGenius",
  icons: {
    icon: "/logosaas.png",
  },
  description: "AI-driven code snippet SaaS application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <GlobalContextProvider>
          <body className={clsx(dmSans.className, "antialiased")}>
            {children}
            <Toaster />
          </body>
        </GlobalContextProvider>
      </ClerkProvider>
    </html>
  );
}
