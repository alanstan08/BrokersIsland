import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export default function BrokerHomepage() {
    const { user } = useAuthContext()
    const [propertyList, setPropertyList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProperties = async () => {
            if (!user && !user.token) {
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

    return (
        <div className='container'>
            <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="text-4xl fw-bold antialiased md:subpixel-antialiased">Welcome Broker </h1>
                    <p className="col-md-12   text-lg antialiased md:subpixel-antialiased italic">Dear Esteemed Brokers,

                        We are excited to introduce you to our Broker's Dashboard, a powerful tool designed to enhance your real estate business and connect you with potential clients. In addition to this exciting opportunity, we are thrilled to offer an exclusive 10% commission for every successful sale made through our platform.</p>

                </div>
            </div>
            <div className="row align-items-md-stretch ">
                <div className="col-md-12 col-sm-12 g">
                    <div className="h-100 p-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-3 ">
                        <h1 className="text-3xl fw-bold ">Contact your Clients now !!</h1>
                        <form >
                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {propertyList.map((property) => (
                                    <div className="card border-2 m-3 rounded" style={{ width: '18rem' }} key={property._id}>
                                        <img src={property.img} className="card-img-top h-40 w-full object-cover" alt="propertyimage"></img>
                                        <div className="card-body col-12-">
                                            <h5 className="card-title m-0 text-lg fw-bold">{property.title}</h5>
                                            <p className="card-text">{property.type}</p>
                                            <p className="card-text">{property.Rooms}</p>
                                            <p className="card-text">{property.Price}</p>
                                            <p className="card-text">{property.Amenties}</p>


                                            <div>

                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>
                            <button className="bg-amber-400 rounded col-12 p-1 ml-4 border-2 border-black" type="submit">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
