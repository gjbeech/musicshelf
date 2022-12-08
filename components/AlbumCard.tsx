import Link from "next/link";
import Image from "next/image";

import styles from "../styles/AlbumCard.module.css";

import { supabase } from "../utils/supabase";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const AlbumCard = ({ data, handleDelete }) => {
  console.log(data);
  //ar imageUrl = data.item.image_url ?? "/public/No-album-art.png";
  return (
    <div className={styles.albumContainer}>
      {data?.map((item) => (
        <div key={item.id} className={styles.container}>
          <div className={styles.cover}>
            <Image
              src={item.image_url ?? "/No-album-art.png"}
              alt="cover art"
              layout="fill"
              objectFit="cover"
            />
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
            {formatDistanceToNow(new Date(item.inserted_at), {
              addSuffix: true,
            })}
          </p>

          <div className={styles.buttons}>
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
