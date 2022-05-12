import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useStateContext } from '../context/StateContext';
const Login = () => {
  const userRef = useRef();
  const passRef = useRef();
  const router = useRouter();
  const { user, setUser } = useStateContext();
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', userRef.current.value);
    formData.append('password', passRef.current.value);

    // const config = {
    //   url: 'https://obscure-gorge-13406.herokuapp.com/userLogin',
    //   method: 'POST',
    //   timeout: '60000',
    //   data: formData,
    // };
    // axios(config).then(async (res) => {
    //   console.log(res);
    // });
    // const response = await axios.post(
    //   'https://obscure-gorge-13406.herokuapp.com/postItem',
    //   formData
    // );
    const response = await fetch(
      'https://obscure-gorge-13406.herokuapp.com/userLogin',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.baseResponse.responseCode == 200) {
      console.log('Logged IN successfully');
      toast.success('Logged IN successfully');
      setUser(data.username);
      router.push('/');
    } else if (data.baseResponse.responseCode == 401) {
      toast.error('User not found');
    }
  };
  return (
    <div className='centered card'>
      <h2 className='text-center mb-4 centered'>Login </h2>

      <form className='product-form'>
        <div className='form-control'>
          <label htmlFor='title'>Username</label>
          <input type='text' name='title' id='title' ref={userRef} />
        </div>
        <div className='form-control'>
          <label htmlFor='title'>Password</label>
          <input type='text' name='title' id='title' ref={passRef} />
        </div>

        <button className='btn' type='submit' onClick={handleSubmit}>
          Login
        </button>
      </form>
      <div className='centered'>
        <Link href='/register'>New User? Register</Link>
      </div>
    </div>
  );
};

export default Login;
