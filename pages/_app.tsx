import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { supabase } from "../utils/supabase";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div>
      <Navbar session={session} />
      <Component {...pageProps} session={session} />
      <Footer />
    </div>
  );
}

export default MyApp;
