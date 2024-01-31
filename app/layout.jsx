"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";

// import { StoreProvider } from "../_lib/context/store";
import { StoreProvider } from "./_lib/context/store";
import { SnackbarProvider } from "notistack";
export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <StoreProvider>{children}</StoreProvider>
          </SnackbarProvider>
        </div>
      </body>
    </html>
  );
}
