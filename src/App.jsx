import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [beers, setBeers] = useState([]);
  const [originalBeers, setOriginalBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching , setIsSearching] = useState(false)

  useEffect(() => {
    fetchBeers();
  }, []);

  const fetchBeers = async () => {
    try {
      const response = await fetch('https://api.punkapi.com/v2/beers');
      const data = await response.json();
      setBeers(data);
      setOriginalBeers(data); 
      setIsSearching(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    
    const filteredBeers = originalBeers.filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBeers(filteredBeers);
    setIsSearching(true); 
  };

  const handleBack = () => {
    fetchBeers(); 
  };

  return (
    <div className="App">
      <h1> Cold Drinks</h1>
      <div>

      {isSearching && (
        <button  onClick={handleBack}>Back </button>
      )}
        <input
          type="text"
          placeholder="Search by beer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        

        
      </div>
      <div className="beer-container">
        {beers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image_url} alt={beer.name} />
            <h3>{beer.name}</h3>
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
