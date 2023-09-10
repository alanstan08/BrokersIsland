import React from 'react'

export default function brokerhomepage() {
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
                    <div className="h-100 p-5 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-3 ">
                        <h1 className="text-3xl fw-bold ">List of Available Properties</h1>
                        <form onSubmit={handleSubmit}>
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
                            <button className="bg-amber-400 rounded col-12 p-1 ml-4 border-2 border-black" type="submit">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}
