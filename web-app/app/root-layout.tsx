// RootLayout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { VolumeProvider } from "@/lib/VolumeContext";
import BackgroundAudio from "@/components/background-audio";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import useUserStore from "@/lib/user-store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user.uid);
      }
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  return (
    <html lang="en">
      <link rel="icon" href="/logo_light.png" sizes="any" />
      <body className={inter.className}>
        <VolumeProvider>
          <BackgroundAudio />
          {children}
        </VolumeProvider>
        <Toaster />
      </body>
    </html>
  );
}
