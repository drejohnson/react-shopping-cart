import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';
// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart-items')) || [],
  );

  const addItem = item => {
    // add the given item to the cart
    setCart([...cart, item]);
    localStorage.setItem('cart-items', JSON.stringify(cart));
  };

  const removeItem = id => {
    const items = cart.filter(item => item.id !== id);
    setCart(items);
    localStorage.setItem('cart-items', JSON.stringify(cart));
  };

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(cart));
  }, [cart]);

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className='App'>
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path='/' component={Products} />

          <Route path='/cart' component={ShoppingCart} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
