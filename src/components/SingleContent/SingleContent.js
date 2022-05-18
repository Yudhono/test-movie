import Badge from "@mui/material/Badge";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import styles from "./SingleContent.module.css";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Image from "next/image";
import { MovieControls } from "../Favorite/MovieControls";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  type,
  movie,
}) => {
  return (
    <ContentModal media_type={media_type} id={id} movie={movie}>
      <Box
        sx={{
          width: 300,
          height: 550,
          paddingTop: 3,
        }}
      >
        <img
          className={styles.poster}
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <Badge
          badgeContent={vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
        />
        <b className={styles.title}>{title}</b>
        <span className={styles.subTitle}>
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className={styles.subTitle}>{date}</span>
        </span>
      </Box>
      <MovieControls type={type} movie={movie} />
    </ContentModal>
  );
};

export default SingleContent;
