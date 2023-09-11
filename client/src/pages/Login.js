import React, { useState, useEffect } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';


export default function Login() {
  const intitalValues = { email: "", password: "" }
  const [formValues, setformValues] = useState(intitalValues)
  const {login, error, isLoading} = useLogin()
  const navigate = useNavigate();
  const {user} = useAuthContext();
  //handle submits
  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = { ...formValues }
    await login(details)   
  }
  //handle redirection
  useEffect(() => {
    if (!error && user) {
      if (user.type==='user'){
        navigate('/userhomepage');
      }
      else{
        navigate('/brokerHomepage')
      }
      
    }
    
  }, [user,error, navigate]);

  //handle inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformValues({ ...formValues, [name]: value })
  }
  return (
    <div>
      <div className='p-6 my-10 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4  '>
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>

            <h1 className="h3 mb-3 fw-normal text-center">Login in</h1>

            <div className="form-floating">
              <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={formValues.email} onChange={handleChange} />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" value={formValues.password} onChange={handleChange} />
              <label htmlFor="floatingPassword">Password</label>
            </div>


            <button disabled={isLoading} className="btn btn-danger text-black w-100 py-2 mt-3" type="submit">Log in</button>
            {error && <div className='m-2 text-red-400'>{error}</div>}
            <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2023</p>
          </form>
        </main>
      </div>
    </div>
  )
}
