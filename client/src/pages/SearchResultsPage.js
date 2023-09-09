// SearchResultsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

function SearchResultsPage() {
  const { query } = useParams();
  

  return (
    <div className='container'>
      <h1>Search Results for: {query}</h1>
      
    </div>
  );
}

export default SearchResultsPage;
