import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useStateContext } from '../context/StateContext';
const AddProduct = () => {
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const nameRef = useRef();
  const idRef = useRef();
  const descRef = useRef();
  const sellerRef = useRef();

  const priceRef = useRef();
  const router = useRouter();
  const { admin } = useStateContext();
  useEffect(() => {
    if (!admin) {
      router.push('/admin-login');
    }
  }, []);

  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('itemName', nameRef.current.value);
    formData.append('itemDescription', descRef.current.value);
    formData.append('itemPrice', priceRef.current.value);
    formData.append('itemId', idRef.current.value);
    formData.append('itemSellerName', sellerRef.current.value);
    formData.append('itemPhoto1', img1);
    formData.append('itemPhoto2', img2);
    formData.append('itemPhoto3', img3);
    const config = {
      url: 'https://obscure-gorge-13406.herokuapp.com/postItem',
      method: 'POST',
      timeout: '60000',
      data: formData,
    };
    // axios(config).then(async (res) => {
    //   console.log(res);
    // });
    // const response = await axios.post(
    //   'https://obscure-gorge-13406.herokuapp.com/postItem',
    //   formData
    // );
    const response = await fetch(
      'https://obscure-gorge-13406.herokuapp.com/postItem',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data2 = await response.json().then((res) => {
      router.push('/admin-products');
    });
    console.log(data2);
  };
  return (
    <div className='centered'>
      <h2 className='text-center mb-4 centered'>Add Product</h2>

      <form className='product-form'>
        <div className='form-control'>
          <label htmlFor='title'>Name</label>
          <input type='text' name='title' id='title' ref={nameRef} />
        </div>
        <div className='form-control'>
          <label htmlFor='title'>ID</label>
          <input type='text' name='title' id='title' ref={idRef} />
        </div>
        <div className='form-control'>
          <label htmlFor='title'>Seller</label>
          <input type='text' name='title' id='title' ref={sellerRef} />
        </div>
        <div className='form-control'>
          <label htmlFor='imageUrl'>Image 1</label>
          <input
            type='file'
            name='imageUrl'
            id='imageUrl'
            onChange={(e) => {
              setImg1(e.target.files[0]);
            }}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='imageUrl'>Image 2</label>
          <input
            type='file'
            name='imageUrl'
            id='imageUrl'
            onChange={(e) => {
              setImg2(e.target.files[0]);
            }}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='imageUrl'>Image 3</label>
          <input
            type='file'
            name='imageUrl'
            id='imageUrl'
            onChange={(e) => {
              setImg3(e.target.files[0]);
            }}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            id='price'
            step='0.01'
            ref={priceRef}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='description'>Description</label>
          <textarea
            name='description'
            id='description'
            rows='5'
            ref={descRef}
          ></textarea>
        </div>

        <button className='btn' type='submit' onClick={handleSubmit}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
