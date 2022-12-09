import Image from "next/image";
import { useState } from "react";

export default function AlbumCovers({
  cover_url,
  back_url,
}: {
  cover_url: string;
  back_url: string;
}) {
  const [showFront, setShowFront] = useState(true);
  console.log("*" + cover_url);
  return (
    <div>
      {showFront ? (
        <Image
          src={cover_url}
          alt="cover art"
          //className={styles.front}
          layout="fill"
          objectFit="cover"
          onClick={() => setShowFront(false)}
        />
      ) : (
        <Image
          src={back_url}
          alt="cover art"
          //className={styles.front}
          layout="fill"
          objectFit="cover"
          onClick={() => setShowFront(true)}
        />
      )}
    </div>
  );
}
