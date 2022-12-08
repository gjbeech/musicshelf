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

    alert("Album updated successfully");

    router.push("/");
  };

  const updateAlbumImage = async (image_url, image_name) => {
    const user = supabase.auth.user();
    console.dir(image_url);

    const { data } = await supabase
      .from("albums")
      .update({
        image_url,
        image_name,
      })
      .eq("id", id)
      .eq("user_id", user?.id);

    alert("Album Image updated successfully");

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
        <AlbumImage
          url={album?.image_name}
          onUpload={updateAlbumImage}
          size="100"
        />

        <button onClick={updateAlbum} className={styles.updateButton}>
          Update Album
        </button>
      </div>
    </div>
  );
};

export default Edit;
