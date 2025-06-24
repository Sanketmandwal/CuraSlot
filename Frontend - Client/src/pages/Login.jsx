import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setToken, backendUrl } = useContext(AppContext)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/login', { password, email })
      const data = response.data;

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate('/')
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }


  }
  return (
    <div style={{ animation: 'slideInFromLeft 1s ease-out' }} className="max-w-md w-full  rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 mt-20 m-auto mb-28">
      <h2 style={{ animation: 'appear 2s ease-out' }} className="text-center text-4xl font-extrabold text-black">
        Welcome
      </h2>
      <p style={{ animation: 'appear 3s ease-out' }} className="text-center text-black">
        Sign in to your account     </p>

      <form method="POST" onSubmit={handleSubmit} action="#" className="space-y-6">
        <div className="relative">
          <input placeholder="john@example.com" className="peer h-10 w-full border-b-2 border-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" required id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" htmlFor="email">Email address</label>
        </div>
        <div className="relative">
          <input placeholder="Password" className="peer h-10 w-full border-b-2 border-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" required id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" htmlFor="password">Password</label>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-black">
            <input className="form-checkbox h-4 w-4 text-violet-950 bg-black border-black rounded" type="checkbox" />
            <span className="ml-2">Remember me</span>
          </label>
          <a className="text-sm text-purple-200 hover:underline" href="#">Forgot your password?</a>
        </div>
        <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200" type="submit">
          Login
        </button>
      </form>
      <div className="text-center text-black">
        Don't have an account?
        <Link className="text-purple-300 hover:underline" to={'/signup'}>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
