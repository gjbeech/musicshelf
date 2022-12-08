import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import styles from "../styles/Create.module.css";
import { useRouter } from "next/router";

const Create = () => {
  const initialState = {
    title: "",
    artist: "",
    year: "",
  };

  const router = useRouter();
  const [albumData, setAlbumData] = useState(initialState);

  const { title, artist, year } = albumData;

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setAlbumData({ ...albumData, [e.target.name]: e.target.value });
  };

  const createAlbum = async () => {
    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from("albums")
      .insert({
        title,
        artist,
        year,
        user_id: user?.id,
      })
      .single();
    console.dir("Album created successfully");
    setAlbumData(initialState);
    router.push("/");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <p className={styles.title}>Create an album</p>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter title"
          />
          <label className={styles.label}>Artist:</label>
          <input
            type="text"
            name="artist"
            value={artist}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter artist"
          />
          <label className={styles.label}>Year:</label>
          <input
            type="text"
            name="year"
            value={year}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter year"
          />

          <button className={styles.button} onClick={createAlbum}>
            Create Album
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
