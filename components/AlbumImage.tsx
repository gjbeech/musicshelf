import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/AlbumImage.module.css";

import { supabase } from "../utils/supabase";
import { Database } from "../utils/database.types";
type Albums = Database["public"]["Tables"]["albums"]["Row"];

export default function AlbumImage({
  url,
  size,
  onUpload,
}: {
  url: Albums["image_name"];
  size: number;
  onUpload: (url: string, fileName: string) => void;
}) {
  const [albumImageUrl, setAlbumImageUrl] =
    useState<Albums["image_name"]>(null);
  const [uploading, setUploading] = useState(false);
  console.log(url);
  console.log(albumImageUrl);
  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("artwork")
        .download(path);
      if (error) {
        throw error;
      }
      if (data !== null) {
        const url = URL.createObjectURL(data);
        setAlbumImageUrl(url);
      }
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadAlbumImage: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();

      console.log(file);

      let { error: uploadError } = await supabase.storage
        .from("artwork")
        .upload(file.name, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("artwork").getPublicUrl(file.name);
      // if (data !== null) {
      //   onUpload(data.publicURL, file.name);
      // }
      onUpload(data?.publicURL ?? "", file.name);
    } catch (error) {
      alert("Error uploading albumImage!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {albumImageUrl ? (
        <Image
          src={albumImageUrl}
          alt="AlbumImage"
          className={`${styles.albumImage} ${styles.image}`}
          style={{ height: size + "px", width: size + "px" }}
          width={size}
          height={size}
        />
      ) : (
        <div
          className={`${styles.albumImage} ${styles.noImage}`}
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <label
          className={`${styles.button} ${styles.primary} ${styles.block}`}
          htmlFor="single"
        >
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          className={styles.uploadInput}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAlbumImage}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
