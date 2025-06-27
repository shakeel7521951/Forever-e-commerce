import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPasword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-pink-100 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200"
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-rose-600">{currentState}</h2>
          <div className="w-10 h-[2px] bg-rose-800 mx-auto mt-2"></div>
        </div>

        {currentState === 'Sign Up' && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
            placeholder="Full Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-3 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition duration-200"
          placeholder="Email Address"
          required
        />

        <input
          onChange={(e) => setPasword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-3 rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition duration-200"
          placeholder="Password"
          required
        />

        <div className="flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:underline">Forgot password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:underline">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:underline">
              Login here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-rose-600 hover:bg-rose-700 py-3 rounded-md  transition text-lg font-medium"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
