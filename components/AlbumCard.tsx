import Link from "next/link";
import Image from "next/image";

import styles from "../styles/AlbumCard.module.css";

//import { supabase } from "../utils/supabase";
import { BsArrowsCollapse, BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { Database } from "../utils/database.types";
import { useState } from "react";
import AlbumCovers from "./AlbumCovers";
type Albums = Database["public"]["Tables"]["albums"]["Row"];

const AlbumCard = ({
  data,
  handleDelete,
  handleSwap,
}: {
  data: Albums[];
  handleDelete: (id: string) => void;
  handleSwap: (id: string) => void;
}) => {
  const [showFront, setShowFront] = useState(true);
  //console.log(data);
  //ar imageUrl = data.item.image_url ?? "/public/No-album-art.png";
  return (
    <div className={styles.albumContainer}>
      {data?.map((item) => (
        <div key={item.id} className={`${styles.container} ${item.id}`}>
          <div className={styles.cover}>
            <AlbumCovers
              cover_url={item.cover_url ?? ""}
              back_url={item.back_url ?? ""}
            />
            {/* {showFront ? (
              <Image
                src={item.cover_url ?? "/No-album-art.png"}
                alt="cover art"
                className={styles.front}
                layout="fill"
                objectFit="cover"
                onClick={() => setShowFront(false)}
              />
            ) : (
              <Image
                src={item.back_url ?? "/No-album-art.png"}
                alt="rear cover art"
                className={styles.back}
                layout="fill"
                objectFit="cover"
                onClick={() => setShowFront(true)}
              />
            )} */}
          </div>
          <p className={styles.title}>
            {" "}
            Title: {""}
            {item.title}
          </p>
          <p className={styles.artist}>
            {" "}
            Artist: {"  "}
            {item.artist}
          </p>
          <p className={styles.year}>Year: {item.year}</p>

          <p className={styles.time}>
            created:{" "}
            {/* {formatDistanceToNow(new Date(item.inserted_at), {
              addSuffix: true,
            })} */}
          </p>

          <div className={styles.buttons}>
            {/* <button
              onClick={() => handleSwap(item.id)}
              className={styles.delete}
              type="button"
            >
              <BsArrowsCollapse />
            </button> */}
            <Link href={`/edit/${item.id}`}>
              <a className={styles.edit}>
                <FiEdit />
              </a>
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              className={styles.delete}
              type="button"
            >
              <BsTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumCard;
