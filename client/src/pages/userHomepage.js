import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';


export default function Homepage() {
    const { user } = useAuthContext()
    const [propertyList, setPropertyList] = useState([]);
    const [chosenProperties, setChosenProperties] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProperties = async () => {
            if (!user || !user.token) {
                // User or user.token is not available yet, do not make the request
                return;
              }
            try {
                console.log(user.token)
                const response = await fetch('http://localhost:4000/userhomepage', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const json = await response.json();
                    setPropertyList(json);
                }
            }
            catch (error) {
                throw Error('error fetching properties', error);
            }
            finally {
                // Set loading to false when the request is complete
                setLoading(false);
            }
        }
        
            fetchProperties();
        
    }, [user])
    useEffect(() => {
        console.log(chosenProperties)
    }, [chosenProperties])

    const handlePropertyChange = (propID) => {
        if (chosenProperties.includes(propID)) {
            setChosenProperties(chosenProperties.filter((id) => id !== propID))
        }
        else {
            setChosenProperties([...chosenProperties, propID])
        }
    }
    const isPropertyChecked = (propID) => {
        return chosenProperties.includes(propID)
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const requestBody = {
            chosenProperties: chosenProperties,
            userEmail: user.email,
          };
          try{
            const response = await fetch('http://localhost:4000/add-user-property', {
            method:'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Authorization' : `Bearer ${user.token}`,
                'Content-type': 'application/json'
                
            },
            });
            alert('Request completed.');
            if(response.ok){
                console.log('Property added succesfully')
                navigate('/userhomepage')
            }
            else{
                console.log('Failed to add properties')
            }
            
    } catch (error) {
        console.error('An error occured:',error)
    }}
    if (loading) {
        // Show a loading indicator or message here
        return <div>Loading...</div>;
    }

    if (user) {
        return (
            <div className='container'>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="text-4xl fw-bold antialiased md:subpixel-antialiased text-center">Welcome {user.user} !!</h1>
                        <p className="col-md-12 m-4  text-lg antialiased md:subpixel-antialiased italic">Welcome to your user homepage dashboard! We're thrilled to have you here and ready to assist you in finding the perfect property. Are you interested in exploring available properties for sale or rent? Let us know your preference, and we'll help you get started on your journey to find your dream home. Whether you're looking for a new place to call your own or exploring rental options, we're here to make your property search a breeze. Let's begin!</p>

                    </div>
                </div>
                <div className="row align-items-md-stretch ">
                    <div className="col-md-12 col-sm-12 g">
                        <div className="h-100 p-5 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-3 ">
                            <h1 className="text-3xl fw-bold text-center m-6">Discover Your Dream Properties</h1>
                            <form onSubmit={handleSubmit}>
                                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
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
                                                <div className="flex justify-end mt-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={isPropertyChecked(property._id)}
                                                        onChange={() => handlePropertyChange(property._id)}

                                                    />
                                                </div>

                                                <div>

                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                    
                                </div>
                                <div className="flex justify-center">
                                <button className="bg-amber-400 rounded col-2 p-1 ml-4 mt-4 border-2 border-black" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }


}
