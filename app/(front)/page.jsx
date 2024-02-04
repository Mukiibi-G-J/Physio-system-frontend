"use client";
import DashBoard from "@/components/Dashboard/DashBoard";
import { Store } from "../_lib/context/store";
import { useContext, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSnackbar } from "notistack"

export const metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  const { dispatch, state } = useContext(Store);
  const { authTokens } = state;

  console.log("authTokens", authTokens);
  useEffect(() => {
    if (authTokens === null) {
      redirect("/signin");
    }
  }, []);

  return (
    <>
      <DashBoard />
    </>
  );
}
