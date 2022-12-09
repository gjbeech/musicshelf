import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Edit.module.css";
import { supabase } from "../../utils/supabase";
import AlbumImage from "../../components/AlbumImage";

const Edit = () => {
  const initialState = {
    title: "",
    artist: "",
    year: "",
    cover_filename: "",
    back_filename: "",
  };
  const [albumData, setAlbum] = useState(initialState);
  const { title, artist, year } = albumData;
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const getAlbum = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("albums")
        .select("*")
        .filter("id", "eq", id)
        .single();
      setAlbum(data);
    };
    getAlbum();
  }, [id]);

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    setAlbum({
      ...albumData,
      [e.target.name]: e.target.value,
    });
  };

  const updateAlbum = async () => {
    const { title, artist, year } = albumData;
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("albums")
      .update({
        title,
        artist,
        year,
      })
      .eq("id", id)
      .eq("user_id", user?.id);

    console.dir("Album updated successfully");

    router.push("/");
  };

  const updateAlbumCover = async (
    cover_url: string,
    cover_filename: string
  ) => {
    const user = supabase.auth.user();
    console.dir("front " + cover_url);

    const { data } = await supabase
      .from("albums")
      .update({
        cover_url,
        cover_filename,
      })
      .eq("id", id)
      .eq("user_id", user?.id);

    console.dir("Album cover updated successfully");

    router.push("/");
  };
  const updateAlbumBack = async (back_url: string, back_filename: string) => {
    const user = supabase.auth.user();
    console.dir("back " + back_url);

    const { data } = await supabase
      .from("albums")
      .update({
        back_url,
        back_filename,
      })
      .eq("id", id)
      .eq("user_id", user?.id);

    console.dir("Album back updated successfully");

    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Edit Album</h1>
        <label className={styles.label}> Title:</label>
        <input
          title="title"
          type="text"
          name="title"
          value={albumData?.title}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Artist:</label>
        <input
          title="artist"
          type="text"
          name="artist"
          value={albumData?.artist}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Year:</label>
        <input
          title="year"
          type="text"
          name="year"
          value={albumData?.year}
          onChange={handleOnChange}
          className={styles.updateInput}
        />

        <label className={styles.label}> Image:</label>
        {/* {album?.image_url} */}
        <div className={styles.images}>
          <AlbumImage
            url={albumData?.cover_filename}
            onUpload={updateAlbumCover}
            size="100"
          />
          <AlbumImage
            url={albumData?.back_filename}
            onUpload={updateAlbumBack}
            size="100"
          />
        </div>
        <button onClick={updateAlbum} className={styles.updateButton}>
          Update Album
        </button>
        <button onClick={() => router.back()} className={styles.updateButton}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Edit;
