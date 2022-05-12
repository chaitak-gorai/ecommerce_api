import React, { useEffect } from 'react';
import { Product, FooterBanner, HeroBanner } from '../components/index';
import { client } from '../lib/client';
const Home = ({ data, bannerData }) => {
  // const [data, setData] = React.useState([]);
  // useEffect(async () => {
  //   const response = await fetch(
  //     'https://obscure-gorge-13406.herokuapp.com/items'
  //   );
  //   const data2 = await response.json();
  //   console.log(data2);
  //   setData(data2);
  // }, []);

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {data?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};
export const getServerSideProps = async () => {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type=="banner"]';
  const bannerData = await client.fetch(bannerQuery);
  // return {
  //   props: {
  //     products,
  //     bannerData,
  //   },
  // };
  const response = await fetch(
    'https://obscure-gorge-13406.herokuapp.com/items'
  );
  const data = await response.json();
  return {
    props: {
      data,
      bannerData,
    },
  };
};
export default Home;
