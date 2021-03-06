import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import styles from './Search.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../src/components/Pagination/CustomPagination";
import SingleContent from "../../src/components/SingleContent/SingleContent";
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
  
const Search = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
  
    const darkTheme = createTheme({
      palette: {
        type: "dark",
        primary: {
            main: "#fff",
        },
      },
    });
  
    const fetchSearch = async () => {
      try {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
                process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
      // eslint-disable-next-line
    }, [type, page]);
  
    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <div className={styles.search}>
                  <TextField
              style={{ flex: 1, backgroundColor: "White"}}
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
            
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="icon label tabs example"
            centered
          >
            <Tab icon={<MovieIcon />} style={{ width: "100%", color: "white" }} label="Search Movies" />
            <Tab icon={<LiveTvIcon />} style={{ width: "100%", color: "white" }} label="Search TV Series" />
          </Tabs>
        </ThemeProvider>
        <div className={styles.trending}>
          {content &&
            content.map((each) => (
              <SingleContent
                key={each.id}
                id={each.id}
                poster={each.poster_path}
                title={each.title || each.name}
                date={each.first_air_date || each.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={each.vote_average}
              />
            ))}
          {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    );
  };
  
  export default Search;
  