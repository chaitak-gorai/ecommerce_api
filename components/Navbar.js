import React from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';
const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, user, admin } =
    useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Captcha Headphones</Link>
      </p>
      <p className='logo'>
        <Link href='/login'>Login</Link>
      </p>
      <p className='logo'>
        <Link href='/register'>Register</Link>
      </p>
      <p className='logo'>
        <Link href='/admin-login'>Admin Login</Link>
      </p>
      {admin && (
        <p className='logo'>
          <Link href='/admin-products'>Admin Products</Link>
        </p>
      )}
      {admin && (
        <p className='logo'>
          <Link href='/add-product'>Add Products</Link>
        </p>
      )}

      <button
        type='button'
        className='cart-icon'
        onClick={() => {
          setShowCart(!showCart);
        }}
      >
        <AiOutlineUser />
        {user}
        <AiOutlineShoppingCart />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
