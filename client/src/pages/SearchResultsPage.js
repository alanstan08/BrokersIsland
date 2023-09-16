// SearchResultsPage.js
import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SearchResultsPage() {
  const { query } = useParams();
  const navigate = useNavigate();
  const [propertyList, setPropertyList] = useState([]);
  
  try {
    const fetchspecificProperties = async (req, res) => {
      const response = await fetch(`http://localhost:4000/searchResult/${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const properties = await response.json();
        setPropertyList(properties)       
      }

    }
    fetchspecificProperties();
  } catch (error) {
    console.log('Error fetching properties', error)
  }
  const handleClick = () => {
    navigate('/login')
  }
  return (
      <div className="row align-items-md-stretch m-5 ">
        <div className="col-md-12 col-sm-12 ">
          <div className="h-100 p-5 bg-gradient-to-r from-purple-500 to-red-500 rounded-3 ">
            <h1 className="text-3xl fw-bold text-center m-6">Search Results for: {query}</h1>
              <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 '>
                {propertyList.map((property) => (
                  <div className="card border-2 m-3 rounded" style={{ width: '18rem' }} key={property._id}>
                    <img src={property.img} className="card-img-top h-40 w-full object-cover" alt="propertyimage"></img>
                    <div className="card-body col-12-">
                      <h5 className="card-title m-0 text-lg fw-bold">{property.title}</h5>
                      <p className="card-text">Type: {property.type}</p>
                      <p className="card-text">BHK: {property.Rooms}</p>
                      <p className="card-text">Price: {property.Price}</p>
                      <p className="card-text">Amenities: {property.Amenities}</p>
                      <p className="card-text">Location: {property.location}</p>
                      
                    </div>

                  </div>
                ))}
                <button className="bg-gradient-to-r from-orange-500 to-green-500 rounded col-12 p-1 ml-4 border-2 border-black" onClick={handleClick}>Login to book your properties</button>
              </div>
          </div>
        </div>

      </div>

  );
}

export default SearchResultsPage;
