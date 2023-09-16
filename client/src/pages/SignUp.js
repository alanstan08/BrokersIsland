import React, { useEffect, useState } from 'react'
import { useSignUp } from '../hooks/useSignUp'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
export default function SignUp() {
  const initialvalues = { usertype: "", email: "", password: "" }
  const [formvalues, setFormvalues] = useState(initialvalues)
  const {signup, error, isLoading} = useSignUp()
  const [passerrormessage, setPasserrormessage] = useState('')
  const [repass, setRepass] = useState('')
  const navigate = useNavigate();
  const {user} = useAuthContext();
  //function to handle submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = { ...formvalues }
    console.log(details)
    await signup(details)
    console.log(error)
   
  }
  //handle redirection
  useEffect(() => {
    if(!error && user){
      if (user.type==='user'){
        navigate('/userhomepage');
      }
      else{
        navigate('/brokerHomepage')
      }
    }
    
  }, [user,error, navigate]);

  //function to handle changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormvalues({ ...formvalues, [name]: value })
  }

  //function to check similarity between passwords
  const handlePasswordCheck = (e) => {
    const newValue = e.target.value;
    setRepass(newValue);
    if (formvalues.password === newValue) {
      setPasserrormessage('');
    } else {
      setPasserrormessage('Passwords do not match');
    }
  };



  return (
    <div >
      <div className='p-6 my-10 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4  '>
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal text-center">Sign Up</h1>
            <div className='flex space-x-4'>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="usertype" id="flexRadioDefault1" value="broker" onChange={handleChange} />
                <label className="form-check-label text-sm" htmlFor="flexRadioDefault1">
                  Broker
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="usertype" id="flexRadioDefault2" value="user" onChange={handleChange} />
                <label className="form-check-label text-sm" htmlFor="flexRadioDefault2">
                  Renter/Buyer
                </label>
              </div>
            </div>
            <div className='m-2 text-red-400'>
            </div>
            <div className="form-floating">
              <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={formvalues.email} onChange={handleChange} />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password" value={formvalues.password} onChange={handleChange} />
              <label htmlFor="floatingPassword">New Password</label>
            </div>
            <div className='m-2 text-red-400'>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={repass} onChange={handlePasswordCheck} />
              <label htmlFor="floatingPassword ">Re enter new password</label>
            </div>
            <div className='m-2 text-red-400'>
              <p>{passerrormessage}</p>
            </div>


            <button disabled={isLoading}   className="btn btn-primary text-black w-100 py-2 mt-2" type="submit">Sign in</button>
            {error && <div className='m-2 text-red-400'>{error}</div>}
            <p className="mt-5 mb-3 text-body-secondary text-center">© 2020–2023</p>
          </form>
        </main>
      </div>
    </div>

  )
}
