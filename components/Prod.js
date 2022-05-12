import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
const Prod = ({
  product: { itemId, itemName, itemDescription, itemPrice, itemPhoto2 },
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    const formData = new FormData();
    formData.append('itemId', itemId);
    const response = await fetch(
      'https://obscure-gorge-13406.herokuapp.com/item/delete',
      {
        method: 'POST',
        body: formData,
      }
    ).then((res) => {
      //   console.locg('deleted successfully');
      console.log(res);
      if (res.status === 200) {
        toast.success('Deleted successfully');
        router.push('/');
      }
    });
  };
  return (
    <div>
      <div className='product-card'>
        <img
          src={itemPhoto2}
          width={250}
          height={250}
          alt='headphones'
          className='product-image'
        />
        <p className='product-name'>name:{itemName}</p>
        <p className='product-name'>id:{itemId}</p>
        <button onClick={handleDelete} className='btn btn-primary'>
          Delete
        </button>
      </div>
    </div>
  );
};
export default Prod;
