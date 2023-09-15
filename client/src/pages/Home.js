import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) =>{
        e.preventDefault();
        if(searchQuery){
            console.log(searchQuery)
            navigate('/search/'+searchQuery)
        }
        
    }

    return (
        <div>
            <div className="px-4 py-5 my-5 text-center">

                <h1 className="display-5 fw-bold text-body-emphasis">"Unlock Wealth Through Smart Real Estate Investments."</h1>

                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4 italic">We specialize in curating a portfolio of prime rental properties tailored to your investment objectives. Our services encompass property identification, rigorous due diligence, negotiation, and acquisition, ensuring a seamless and profitable real estate investment experience. With expert guidance and a diverse range of properties, we empower you to grow your rental property portfolio and achieve your financial goals with confidence.</p>

                </div>
            </div>

            <div className='text-center p-5 m-5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white'>
                <h2 className=" fw-bold text-body-emphasis">Find your desired location</h2>
                <form className="container-fluid col-10 col-lg-auto mb-3 mb-lg-0 me-lg-3 justify-between"  onSubmit={handleSearch}>
                    <input onChange={(e)=>{
                        setSearchQuery(e.target.value)
                    }} type="search" className=" mt-3 form-control form-control-dark" placeholder="Search for place.." aria-label="Search" />
                    <button type="submit" className='btn btn-outline-light mt-3'
                   >Search</button>
                </form>
            </div>
            
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3 m-5">
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 w-full h-60">
                        <img className='w-[100%] h-[100%] object-cover' src='https://imageio.forbes.com/specials-images/imageserve/61094e6051bb4a2bacce5663/real-estate-investing/960x0.jpg?height=473&width=711&fit=bounds'  alt="LearnMore" />
                    </div>
                    <h3 className="fs-2 text-body-emphasis">Diverse Property Portfolio</h3>
                    <p>We offer a diverse range of rental properties to suit various investment goals, whether you're looking for residential, commercial, or vacation rentals. Our portfolio includes properties in prime locations with strong income potential.</p>
                        <button className='btn btn-info'>
                            learn more
                        </button>
                </div >
                
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 w-full h-60 ">
                        <img className="w-[100%] h-[100%] object-cover" src='https://media.licdn.com/dms/image/C5112AQG1cc41Na3mFw/article-cover_image-shrink_720_1280/0/1520120395314?e=2147483647&v=beta&t=WmMkTak20vQgi5b9HqBD_N3CESWPkpae4AFS3xMNR9o' alt="LearnMore" />
                    </div>
                    <h3 className="fs-2 text-body-emphasis">Streamlined Investment Process</h3>
                    <p>Our services streamline the property acquisition process, from property identification and due diligence to negotiation and acquisition. We ensure a hassle-free experience, allowing you to focus on building your real estate portfolio.</p>
                    <button className='btn btn-info'>
                        learn more
                    </button>
                </div>
                <div className="feature col">
                    <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 w-full h-60">
                        <img className='w-[100%] h-[100%] object-cover' src='https://valuepersqft.com/wp-content/uploads/2023/07/real-estate-consultant-service.jpg' alt="LearnMore" />
                    </div>
                    <h3 className="fs-2 text-body-emphasis"> Providing Standardized Brokerage Costs</h3>
                    <p>we offer standardized brokerage costs to provide clear and equitable pricing for all your real estate needs. Our transparent fee structure ensures fairness and consistency, making your real estate transactions straightforward and hassle-free. Trust us for a cost-effective and honest approach to real estate brokerage.</p>
                    <button className='btn btn-info'>
                        learn more
                    </button>
                </div>
            </div>

        </div>
        

    )
}
