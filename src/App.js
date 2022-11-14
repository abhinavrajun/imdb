import "./App.css";
import Search from "./Search.js";
import { useQuery } from "react-query";
import { useState, useEffect, useRef } from "react";
function App() {
  const [movies, setMovies] = useState([]);
  const [movieselect, setmovieselect] = useState([]);
  let myref = useRef(null);
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState(false);
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=5fa35e5a`)
      .then((response) => response.json())
      .then((result) => setMovies(result.Search));
  }, [search]);
  const movieinfo = (m) => {
    const id = m.imdbID;
    setInfo(true);
    setmovieselect(m);
    console.log(m.Title);
  };
  const mouse = (id) => {
    const map = getMap();
    const node = map.get(id);
    node.style.border = "1px solid black";
  };
  const mouseleave = (id) => {
    const map = getMap();
    const node = map.get(id);
    node.style.border = "0px";
  };
  function getMap() {
    if (!myref.current) {
      // Initialize the Map on first usage.
      myref.current = new Map();
    }
    return myref.current;
  }
  function backtosearch() {
    setInfo(false);
  }
  return (
    <div className="App">
      <Search search={search} setSearch={setSearch} />
      <button onClick={backtosearch}>Back to search</button>
      {/* {movies
        ? movies.map((m) => (
          <>
          {m.Title}
          <img
          ref={(node) => {
            const map = getMap();
            if (node) {
              map.set(m.imdbID, node);
            } else {
              map.delete(m.imdbID);
            }
          }}
          src={m.Poster}
          key={m.imdbID}
          onClick={() => movieinfo(m)}
          onMouseEnter={() => mouse(m.imdbID)}
          onMouseLeave={() => mouseleave(m.imdbID)}
          />
          </>
          ))
        : "No such movie"} */}
      <div className="full">
        {info ? (
          <div>
            <ul>
              {movieselect.Title}
              {movieselect.Year}
              <img src={movieselect.Poster} alt="movie"></img>
            </ul>
          </div>
        ) : movies ? (
          movies.map((m) => (
            <>
              <img
                alt="movie"
                ref={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(m.imdbID, node);
                  } else {
                    map.delete(m.imdbID);
                  }
                }}
                src={m.Poster}
                key={m.imdbID}
                onClick={() => movieinfo(m)}
                onMouseEnter={() => mouse(m.imdbID)}
                onMouseLeave={() => mouseleave(m.imdbID)}
              />
              <p>{m.Title}</p>
            </>
          ))
        ) : (
          "No such movie"
        )}
      </div>
    </div>
  );
}

export default App;
