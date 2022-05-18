import * as React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import styles from "./ContentModal.module.css";
import Box from "@mui/material/Box";

import { GlobalContext } from "../../context/GlobalState";

export default function TransitionsModal({ children, media_type, id, movie }) {
  const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);

  console.log(777, "watchlist", watchlist);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  console.log("halo:", storedMovie);
  console.log(777, "movie", movie);

  const watchlistDisabled = storedMovie ? true : false;

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  console.log(addMovieToWatchlist);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className={styles.media}
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          {content && (
            <Box
              sx={{
                width: "60%",
                height: "70%",
                backgroundColor: "#030b17",
                border: 0,
                borderRadius: 10,
                color: "white",
                boxShadow: 0,
                padding: 1,
              }}
            >
              <div className={styles.ContentModal}>
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className={styles.ContentModal__portrait}
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className={styles.ContentModal__landscape}
                />
                <div className={styles.ContentModal__about}>
                  <span className={styles.ContentModal__title}>
                    {content.name || content.title} - {""}
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                  </span>

                  <span className={styles.ContentModal__description}>
                    {content.overview}
                  </span>

                  <Button
                    variant="contained"
                    color="primary"
                    target="__blank"
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(movie)}
                  >
                    ADD TO FAVORITE
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
