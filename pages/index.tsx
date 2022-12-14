import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import AlbumCard from "../components/AlbumCard";
import { Session } from "@supabase/supabase-js";
import { Database } from "../utils/database.types";
//import { AlbumCardProps } from "../utils/types";
type Albums = Database["public"]["Tables"]["albums"]["Row"];

export default function Home({ session }: { session: Session }) {
  const [data, setData] = useState<Albums[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const user = supabase.auth.user();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("user_id", user?.id);

      if (error) throw error;
      setData(data);
    } catch (error) {
      //alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Fetching Albums...</div>;
  }

  const handleDelete = async (id: any) => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("albums")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      fetchAlbums();
      if (error) throw error;
      alert("Album deleted successfully");
    } catch (error) {
      //alert(error.message);
    }
  };
  const handleSwap = async (id: any) => {
    try {
      const album = document.getElementsByClassName(
        `${id}`
      )[0] as HTMLElement | null;
      if (album) {
        //const f = document.querySelectorAll<HTMLElement>(`${id} "front"`) as HTMLElement | null;
        //const b = document.querySelectorAll<HTMLElement>(`${id} ${"back"}`) as HTMLElement | null;
        var front = album.getElementsByClassName(
          `${"front"}`
        )[0] as HTMLElement | null;
        var back = album.getElementsByClassName(
          `${"back"}`
        )[0] as HTMLElement | null;
        if (back !== null) {
          if (window.getComputedStyle(back).display === "none") {
            if (front !== null) {
              //album.getElementsByClassName(`${"back"}`)[0].style.display = "none";
              front.style.display = "none";
              back.style.display = "block";
              console.dir("showing back..");
            }
          } else {
            if (front !== null) {
              //album.getElementsByClassName(`${"back"}`)[0].style.display = "none";
              front.style.display = "block";
              back.style.display = "none";
              console.dir("showing front..");
            }
          }
        }
      }
    } catch (error) {
      //alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs x Supabase</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.home}>
        {!session?.user ? (
          <div>
            <p>
              Welcome to Music Shelf. Login to your account or sign in for a
              demo
            </p>
          </div>
        ) : (
          <div>
            <p className={styles.albumHeading}>
              Hello <span className={styles.email}>{session.user.email}</span>,
              Welcome to your dashboard
            </p>
            {data?.length === 0 ? (
              <div className={styles.noAlbum}>
                <p>You have no albums yet</p>
                <Link href="/create">
                  <button className={styles.button}> Add an Album</button>
                </Link>
              </div>
            ) : (
              <div>
                <p className={styles.albumHeading}>Here are your albums</p>
                <AlbumCard
                  data={data}
                  handleDelete={handleDelete}
                  handleSwap={handleSwap}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
