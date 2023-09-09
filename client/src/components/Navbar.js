import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const handleClick = () => {
    logout()
    navigate('/home');
  }

  return (
    <div>
      <header className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to='/'>
              <h4 className='font-bold text-xl pr-2'>BROKERS ISLAND</h4>
            </Link>



            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <Link className="nav-link px-2 text-white" to='/home'>
                <li>Home</li>
              </Link>
              <Link className="nav-link px-2 text-white" to='/about'>
                <li>About</li>
              </Link>

            </ul>



            <div className="text-end">
              {user && (
                <div>
                  <span className='mr-3'>{user.email}</span>
                  <button onClick={handleClick} type="button" className="btn btn-outline-light">Logout</button>
                </div>
              )}
            {!user && (<div>
                <Link to='/login'>
                  <button type="button" className="btn btn-outline-light me-2">Login</button>
                </Link>

                <Link to='/sign-up'>
                  <button type="button" className="btn btn-outline-light">Sign-up</button>
                </Link>
              </div>)}


            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
