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
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {searchResults.map(movie => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  // dsfsd
}


export default App;
