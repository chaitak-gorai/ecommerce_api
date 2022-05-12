import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
const Product = ({
  product: {
    itemName,
    itemDescription,
    itemPrice,
    itemId,
    itemSellerName,
    itemPhoto1,
  },
}) => {
  return (
    <div>
      <div className='product-card '>
        <img
          src={itemPhoto1}
          width={250}
          height={250}
          alt='headphones'
          className='product-image'
        />
        <div className='row'>
          <div className='col-md-6'>
            <p className=' product-name'>{itemName}</p>
            <p className='product-name'>id:{itemId}</p>
          </div>
          <div className='col-md-6'>
            <p className='product-name'>Price:{itemPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
