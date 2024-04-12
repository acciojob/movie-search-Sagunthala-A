import React, { useState } from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=99eb9fd1&s=${searchQuery}`);
      const data = await response.json();

      if (data.Response === 'False') {
        setError('Invalid movie name. Please try again.');
        setSearchResults([]);
      } else {
        setError('');
        setSearchResults(data.Search || []);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.');
      setSearchResults([]);
    }
  };

  return (
    <div>
      <label htmlFor='search-bar'>Search Movies</label><br/>
      <input
        type="text"
        id='search-bar'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
     
      {
        searchResults.length>0 ? (
          <ul className="movie-list">
            {searchResults.map(movie => (
              <li key={movie.imdbID}>
                  <h3>{movie.Title} ({movie.Year})</h3>
                  <img src={movie.Poster} alt={movie.Title} />
              </li>
            ))}
      </ul>
        ):(
          <p>{error}</p>
        )
      }
      </div>
  );
  // "Search": [
  //   {
  //       "Title": "Batman Begins",
  //       "Year": "2005",
  //       "imdbID": "tt0372784",
  //       "Type": "movie",
  //       "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  //   },
  // ]
}


export default App;
