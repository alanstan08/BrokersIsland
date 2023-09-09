import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Homepage() {
    const { user } = useAuthContext()
    const [propertyList, setPropertyList] = useState([]);
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:4000/userhomepage', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
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

        }
        if (user) {
            fetchProperties();
        }
    }, [user])

    const handleSelect = async (id) => {
        const email = user.email;
        try {
            const response = await fetch('http://localhost:4000/add-user-property/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, id }),
            });
            if (!response.ok) {
                throw new Error('Error adding property to user')
            }
            else {
                console.log('user added to property successfully')
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (user) {
        return (
            <div className='container'>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="text-4xl fw-bold antialiased md:subpixel-antialiased">Welcome {user.email} </h1>
                        <p className="col-md-12   text-lg antialiased md:subpixel-antialiased italic">Welcome to your user homepage dashboard! We're thrilled to have you here and ready to assist you in finding the perfect property. Are you interested in exploring available properties for sale or rent? Let us know your preference, and we'll help you get started on your journey to find your dream home. Whether you're looking for a new place to call your own or exploring rental options, we're here to make your property search a breeze. Let's begin!</p>

                    </div>
                </div>
                <div className="row align-items-md-stretch ">
                    <div className="col-md-12 col-sm-12 g">
                        <div className="h-100 p-5 bg-gradient-to-r from-green-500 to-pink-500 rounded-3 ">
                            <h1 className="text-3xl fw-bold ">List of Available Properties</h1>
                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {propertyList.map((property) => (
                                    <div className="card border-2 m-3 rounded" style={{ width: '18rem' }} key={property._id}>
                                        <img src={property.img} className="card-img-top h-40 w-full object-cover" alt="propertyimage"></img>
                                        <div className="card-body col-12-">
                                            <h5 className="card-title m-0">{property.title}</h5>
                                            <p className="card-text">{property.type}</p>
                                            <p className="card-text">{property.Rooms}</p>
                                            <p className="card-text">{property.Price}</p>
                                            <p className="card-text">{property.Amenties}</p>
                                            <div className="flex justify-end mt-2">
                                                <input
                                                    type="checkbox"
                                                    checked={property.interested} // Update this with the actual property's interest status
                                                    onChange={() => handleCheckboxClick(property._id, property.interested)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }


}
