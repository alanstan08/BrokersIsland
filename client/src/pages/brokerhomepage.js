import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export default function BrokerHomepage() {
    const { user } = useAuthContext()
    const [propertyList, setPropertyList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProperties = async () => {
            if (!user || !user.token) {
                // User or user.token is not available yet, do not make the request
                return;
            }
            try {

                const response = await fetch('http://localhost:4000/brokerHomepage', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log(json.updatedProperties)
                    setPropertyList(json.updatedProperties);
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
    if (loading) {
        // Show a loading indicator or message here
        return <div>Loading...</div>;
    }
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
                                {Array.isArray(propertyList) && propertyList.map((property) => (
                                    <div className="card border-2 m-3 rounded" style={{ width: '18rem' }} key={property._id}>
                                        <img src={property.img} className="card-img-top h-40 w-full object-cover" alt="propertyimage"></img>
                                        <div className="card-body col-12-">
                                            <h5 className="card-title m-0 text-lg fw-bold">{property.title}</h5>
                                            <p className="card-text">Type: {property.type}</p>
                                            <p className="card-text">BHK:{property.Rooms}</p>
                                            <p className="card-text">Price{property.Price}</p>
                                            <p className="card-text">Amenties: {property.Amenties}</p>
                                            <ol className="card-text" start="1">Interested:</ol>
                                            <div className="card-text">
                                                <p className="font-bold mb-2">Interested:</p>
                                                <ol className="list-decimal pl-4 ">
                                                    {property.Interested.map((user, index) => (
                                                        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                                            <li key={user} className="mb-1 text-sm sm:col-span-2 md:col-span-2 lg:col-span-2">{user.email}</li>
                                                            <button className=' bg-blue-500 text-xs hover:bg-blue-600 text-xs text-white font-bold rounded-full h-10 w-20' value={JSON.stringify(user)} onClick={(e) => {
                                                                e.preventDefault();
                                                                alert(`Contact Details:\nName: ${user.contact.name}\nPhone Number: ${user.contact.phonenumber}`)
                                                            }}>Contact</button>
                                                        </div>
                                                    ))}

                                                </ol>


                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
