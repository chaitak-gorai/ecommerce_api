import React, { useEffect, useState } from 'react';
import Prod from '../components/Prod';
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Admin = () => {
  const [data, setData] = useState([]);
  const { admin } = useStateContext();
  const router = useRouter();
  useEffect(async () => {
    console.log(admin);
    if (admin) {
      const response = await fetch(
        'https://obscure-gorge-13406.herokuapp.com/items'
      );
      const data2 = await response.json();
      console.log(data2);
      setData(data2);
    } else {
      router.push('/admin-login');
    }
  }, []);

  //   setData(data2);
  return (
    <div>
      <div className='products-container'>
        {data?.map((product) => (
          <Prod key={product._id} product={product} />
        ))}
      </div>
      <div className='centered '>
        <Link href='/add-product'>
          <button className='btn primary'>Add Products</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
