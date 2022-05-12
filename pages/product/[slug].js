import React from 'react';
import { client, urlFor } from '../../lib/client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
const ProductDetails = ({ product, products }) => {
  const { itemId, itemName, itemDescription, itemPrice, itemPhoto2 } = product;
  console.log(product);
  console.log(products);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [index, setIndex] = React.useState(0);
  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img src={itemPhoto2} className='product-detail-image' />
          </div>
          <div className='small-image-container'></div>
        </div>
        <div className='product-detail-desc'>
          <h1> {itemName}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4> Details:</h4>
          <p>{itemDescription} </p>
          <p className='price'>${itemPrice}</p>
          <div className='quantity'>
            <h3>Quantity</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => {
                onAdd(product, qty);
              }}
            >
              Add to cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like </h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  // const query = `*[_type=="product"]{
  //      slug{
  //          current
  //      }
  //  }`;
  // const products = await client.fetch(query);
  const response = await fetch(
    'https://obscure-gorge-13406.herokuapp.com/items'
  );
  const products = await response.json();
  const paths = products.map((product) => ({
    params: {
      slug: product.itemId,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({ params: { slug } }) => {
  // const query = `*[_type=="product" && slug.current=="${slug}"][0]`;
  // const productsQuery = `*[_type=="product"]`;
  // const product = await client.fetch(query);
  // const products = await client.fetch(productsQuery);
  // const bannerQuery = '*[_type=="banner"]';
  // const bannerData = await client.fetch(bannerQuery);
  const response = await fetch(
    'https://obscure-gorge-13406.herokuapp.com/items'
  );
  const products = await response.json();

  // const formData = new FormData();
  // formData.append('itemId', slug);
  const response2 = await fetch(
    'https://obscure-gorge-13406.herokuapp.com/items/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        itemId: slug.current,
      },
    }
  );
  const product = await response2.json();
  return {
    props: {
      products,
      product,
    },
  };
};
export default ProductDetails;
