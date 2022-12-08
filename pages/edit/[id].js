import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Edit.module.css";
import { supabase } from "../../utils/supabase";
import AlbumImage from "../../components/AlbumImage";

const Edit = () => {
  const [album, setAlbum] = useState(null);
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

  const handleOnChange = (e) => {
    setAlbum({
      ...album,
      [e.target.name]: e.target.value,
    });
  };

  const updateAlbum = async () => {
    const { title, artist, year } = album;
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

  const updateAlbumCover = async (cover_url, cover_filename) => {
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
  const updateAlbumBack = async (back_url, back_filename) => {
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
          type="text"
          name="title"
          value={album?.title}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Artist:</label>
        <input
          type="text"
          name="artist"
          value={album?.artist}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Year:</label>
        <input
          type="text"
          name="year"
          value={album?.year}
          onChange={handleOnChange}
          className={styles.updateInput}
        />

        <label className={styles.label}> Image:</label>
        {/* {album?.image_url} */}
        <div className={styles.images}>
          <AlbumImage
            type="cover"
            url={album?.cover_filename}
            onUpload={updateAlbumCover}
            size="100"
          />
          <AlbumImage
            type="back"
            url={album?.back_filename}
            onUpload={updateAlbumBack}
            size="100"
          />
        </div>
        <button onClick={updateAlbum} className={styles.updateButton}>
          Update Album
        </button>
        <button nClick={() => Router.back()} className={styles.updateButton}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Edit;
